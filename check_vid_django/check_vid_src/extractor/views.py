from django.shortcuts import render

import pandas as pd

from tqdm import tqdm

import time
import os
import string



from youtube_transcript_api import YouTubeTranscriptApi

# Create your views here.

def get_transcript_df(video_id_input):
    text=[]
    start=[]
    duration=[]

    for dic in YouTubeTranscriptApi.get_transcript(video_id_input):
        text+=[dic['text']]
        start+=[dic['start']]
        duration+=[dic['duration']]


    output_dict_tran = {
                'text': text,
                'start': start,
                'duration': duration,
                }    
    return pd.DataFrame(output_dict_tran, columns = output_dict_tran.keys())

