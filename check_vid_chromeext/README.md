# Weekendpedia Chrome Extension

Everything below is from the wikipedia app i copied this from, I am reworking it for my app that looks at youtube comments.



This repo is the Chrome Extension part of the [Insight Data Science](https://insightdatascience.com) project [Weekendpedia](https://chrome.google.com/webstore/search/weekendpedia). The source code for the API server and other information can be found in this [repo](https://github.com/jiananarthurli/insight_api).

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

The function that monitors the behavior of the Chrome extension is stored in [```./src/bg/background.js```](./src/bg/background.js). A listener function (```chrome.webNavigation.onDOMContentLoaded.addListener()```) is added so that the URL of the newest page is inspected once the [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) of the webpage is loaded . Wikipedia page topic is extracted from the URL, and sent to the API server. If relevant events are found, the event info will be returned in the json strings from the API server and then stored locally (```chrome.storage.local.set()```). The icon will be changed (```chrome.browserAction.setIcon()```) to notify the user.

Everytime the icon of the Chrom extension is clicked, a new webpage will be constructed from [```./src/browser_action```](./src/browser_action). The javascripts in [```./src/browser_action/browser_action.js```](./src/browser_action/browser_action.js) retrieve event info from the browser's local storage space (```chrome.storage.local.get()```). If the space is not empty, an event listing page will be constructed, using the styles defined in [```./browser_action/browser_action/style.css```](./src/browser_action/style.css), otherwise a default page is displayed.

The locale information is stored in [```./_locales```](./_locales).


Google has a great tutorial for Chrome extensions:

https://developer.chrome.com/extensions/getstarted

All the Chrome API functions can be found in the official docs:

https://developer.chrome.com/extensions/api_index

The Chrome API functions are async functions. More info can be found here:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

This is a great site for templates, if you need more fancy stuffs in your extension:

https://extensionizr.com 
