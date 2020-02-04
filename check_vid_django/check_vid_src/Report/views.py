from django.shortcuts import render

import numpy as np
import pandas as pd

from extractor.views import get_transcript_df
from Words.views import swear_words, sex_words, stop_words

from django.http import HttpResponse
import json
from time import time

from gensim.models import Word2Vec, KeyedVectors
from gensim.test.utils import get_tmpfile
import string
#from nltk.corpus import stopwords
import nltk
lemma=nltk.stem.WordNetLemmatizer()#from nltk.stem import WordNetLemmatizer as lemma




#from fuzzywuzzy import fuzz

# Create your views here.
model=KeyedVectors.load_word2vec_format('Report/GoogleNews-vectors-negative300.bin',binary=True, limit=100000)

def text_process(mess):
    """
    Takes in a string of text, then performs the following:
    1. Remove all punctuation
    2. Remove all stopwords
    3. Lematize
    4. Returns a list of the cleaned text
    """
    # Check characters to see if they are in punctuation
    nopunc = [char for char in mess if char not in string.punctuation]

    # Join the characters again to form the string.
    nopunc = ''.join(nopunc)
    
    # Now just remove any stopwords
    nostop=[word for word in nopunc.split() if word.lower() not in stop_words()]
    nostop=' '.join(nostop)
    nostop=nostop.replace('ass','asss')

    lemmatized=[lemma.lemmatize(w) for w in str(nostop).lower().split()]

        
        
    return ' '.join(lemmatized)
def text_score(text,badwords,fuzz_thresh=70):
    n=len(text.split()) # number of words in text
    text_score_all=[]
    
    
    if not only_model_words(text,model).split():
        text_score_all=[0]
    else:
        for E in only_model_words(text,model).split():
            score=0
            for word in badwords:
                if word in model.vocab:
                    if model.similarity(E,word)>score:
                        score=model.similarity(E,word)
                text_score_all+=[score]
    # for word in text.split():
    #     for bad_word in badwords:
    #         if fuzz.ratio(word,bad_word)>fuzz_thresh:
    #             text_score_all+=[fuzz.ratio(word,bad_word)/100]
    return max(text_score_all)

def only_model_words(text,model):
    new_text=[]
    for word in text.split():
        if word in model.vocab:
            new_text+=[word]
    return ' '.join(new_text)

def number_to_warning(n):
    upper=0.9
    lower=0.6
    if n>=upper:
        return 'probably bad'
    if (n<upper) & (n>lower):
        return 'possibly bad'
    if n<=lower:
        return 'probably fine'

def rate_pd(tran_pd,rate_with=5):
    
    tran_pd['score']=tran_pd.text.apply(lambda t: text_score(text_process(t),swear_words(),fuzz_thresh=90))
    tran_pd['warning']=tran_pd.score.apply(lambda n: number_to_warning(n) )    
    rating=number_to_warning(tran_pd.score.sort_values(ascending=False).head(rate_with).mean())
    return [tran_pd,rating]

def sec_to_clock(t):
    t=int(t)
    return str(t//3600) + ':' + str(t%3600//60) + ':' + str( t%3600%60  )


def Report(request):   #request
    # get inputs from request:
    # get id and isolate it from extra info
    video_id=request.GET['video_id']
    video_id=video_id.split('&')[0]
    video_id=video_id.split('=')[0]


    #get the transcript and comments of the video
    tran_pd= get_transcript_df(video_id)

    # retun dataframe (df) with the comments relvant to the seleceted time slot
    [Report_df,rating] = rate_pd(tran_pd, rate_with=5)

    Report_df=Report_df.sort_values(by='score',ascending=False).head(5)

    # if comments are found, use comments in the df and construct the response dict
    Report_list = []
    found=False
    if len(Report_df) != 0:
        found = True
        i=0
        while i < len(Report_df):
            redFlag_text=Report_df.iloc[i].text
            redFlag_score=Report_df.iloc[i].warning
            redFlag_start=sec_to_clock(Report_df.iloc[i].start)
            redFlag_duration=Report_df.iloc[i].duration



            # add all the above information to comment list
            Report_list.append({
                'text' : str(redFlag_text),
                'score' : str(redFlag_score),
                'start' : str(redFlag_start),
                'duration' : str(redFlag_duration),
            })
            i+=1

    Report_dict = {'found' : found, 'Report' : Report_list, 'rating' : rating}

    # convert to json
    response = json.dumps(Report_dict)

    #print a time bar in terminal
    tic = time()
    print("Time lapse {}".format(time() - tic))

    #retrun the response that has the relvant comments, this is passsed to the chrome extension
    return HttpResponse(response)



