# checkvid

The overall format of this chrome extension is based on [repo](https://github.com/jiananarthurli/insight_chrome_extension)

Youtube makes efforts to have strict parental controls and a kid friendly ‘Youtube Kids’ website. However, 500 hours of videos are uploaded a minute, and inappropriate creators are constantly trying to push their videos past the algorithms that can not be too strict at the risk of severely limiting the market.   I used youtube transcripts to rate videos and mark red flags in a chrome extension that parents can review quickly. I used a Word2Vec model to see how close a video text is to a list of ‘bad’ words as a measure of how non kid friendly the text is. This narrows the problem from millions of videos for youtube to screen exactly right, to just the parent screening single videos effectively and quickly. This also helps youtube to lose less subscribers, who would otherwise leave youtube due to  traumatic child viewership.

# The Background Model Code 
The files for the chrome extenion are in the [check_vid_django/check_vid_src/](./check_vid_django/check_vid_src/) folder.   

# The Chrome Extension  
The files for the chrome extenion are in the [check_vid_chromeext](./check_vid_chromeext) folder. 

The extenstion takes as an input the video's id. It then sends the video id to a Ec2 instance and retrieves the red flags of inapropriate language in the video. The extension returns the red flags as a list in the display window. 



```bash
.
├── README.md
├── _locales
│   └── en
│       └── messages.json
├── icons
│   ├── Logo.png
│   └── Logo_greyscale.png
├── manifest.json
└── src
    ├── bg
    │   ├── background.html
    │   └── background.js
    └── browser_action
        ├── browser_action.html
        ├── browser_action.js
        └── style.css
```

There are four components in the the Chrome extension: manifest (```./manifest.json```), background scripts (```./bg/background.js```), pop-up window (```./browser_action```) and icons (```./icons```). 

Manifest is the starting point of the extension. The basic info (extension name, description, etc), location of resources, and permissions are all stored in [```./manifest.json```](./manifest.json).

The [```./src/bg/background.js```](./src/bg/background.js) is soley used to blank the data and output of the chrome extention when the url is reloaded.

The functions that do most of the work are stored in [```./src/browser_action/browser_action.js
```](./src/browser_action/browser_action.js). A function that listens for the click of a "submit" button is added (document.getElementById('submit').onclick) so that the user will start the process when they are ready. The video id is extracted from the URL, and sent to an EC2 instance on AWS, which hosts an ongoing djagno process. The Dajngo process is used to put the video_id as an input to the background model and to recive the report of red flags in the video as an output. The report is returned in json strings and then stored locally (```chrome.storage.local.set()```). The icon will be changed (```chrome.browserAction.setIcon()```) to notify the user. the red flags will then be retrieved from the browser's local storage space (```chrome.storage.local.get()```). If the space is not empty, a red flag listing page will be constructed, using the styles defined in [```./browser_action/browser_action/style.css```](./src/browser_action/style.css). If the process fails, the initial display will not change.

The locale information is stored in [```./_locales```](./_locales).


Google has a great tutorial for Chrome extensions:

https://developer.chrome.com/extensions/getstarted

All the Chrome API functions can be found in the official docs:

https://developer.chrome.com/extensions/api_index

The Chrome API functions are async functions. More info can be found here:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

This is a great site for templates, if you need more fancy stuffs in your extension:

https://extensionizr.com 
