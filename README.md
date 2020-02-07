# checkvid

[The overall format of this chrome extension is based on [repo](https://github.com/jiananarthurli/insight_chrome_extension)]

Youtube makes efforts to have strict parental controls and a kid friendly ‘Youtube Kids’ website. However, 500 hours of videos are uploaded a minute, and inappropriate creators are constantly trying to push their videos past the algorithms that can not be too strict at the risk of severely limiting the market.   I used youtube transcripts to rate videos and mark red flags in a chrome extension that parents can review quickly. I used a Word2Vec model to see how close a video text is to a list of ‘bad’ words as a measure of how non kid friendly the text is. This narrows the problem from millions of videos for youtube to screen exactly right, to just the parent screening single videos effectively and quickly. This also helps youtube to lose less subscribers, who would otherwise leave youtube due to  traumatic child viewership.


# The Chrome Extension  
The files for the chrome extenion are in (```./check_vid_chromeext```) takes inputs Start and Duration for a selected time slot of a YouTube video, and the video's id. It then sends the times and video id to a remote API server and retrieves from that server the comments most relevant to selected time slot of the video. The extension returns the comments as a list in the display window. The source code for the API server and other information can be found in this




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

The [```./src/bg/background.js```](./src/bg/background.js) is currently oboslete for this chroem extension.

The functions that do most of the work are stored in [```./src/browser_action/browser_action.js
```](./src/browser_action/browser_action.js). A function that listens for the click of a "submit" button is added (document.getElementById('submit').onclick) so that the user will start the process after entering in the start and duration times for the time slot of the video they want to find relevant comments for. The video id is extracted from the URL, and sent along with the start and duration times to the API server. When relevant comments are found, the comments info will be returned in json strings from the API server and then stored locally (```chrome.storage.local.set()```). The icon will be changed (```chrome.browserAction.setIcon()```) to notify the user. the comments will then be retrieved from the browser's local storage space (```chrome.storage.local.get()```). If the space is not empty, a comment listing page will be constructed, using the styles defined in [```./browser_action/browser_action/style.css```](./src/browser_action/style.css). If the process fails, the initial display will not change.

The locale information is stored in [```./_locales```](./_locales).


Google has a great tutorial for Chrome extensions:

https://developer.chrome.com/extensions/getstarted

All the Chrome API functions can be found in the official docs:

https://developer.chrome.com/extensions/api_index

The Chrome API functions are async functions. More info can be found here:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

This is a great site for templates, if you need more fancy stuffs in your extension:

https://extensionizr.com 
