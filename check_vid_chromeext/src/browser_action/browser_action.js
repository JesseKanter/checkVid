
function load() {

  // Get the report_text container 
  var report_text= document.getElementById("report_text");

  // chrome.storage.local.get("rating", function(data) {
  //   if(typeof(data.rating) !== "undefined") {
  //     report_text.innerHTML = 'This video is '+data.rating+'<br><br>';

      
  //   }

  // }) 
  


  // Retrieve data from local memory
  chrome.storage.local.get("Report", function(data) {

    // If the data is updated
    if(typeof(data.Report) !== "undefined") {


      report_text.innerHTML = 'Below are times and text of the more questionable parts of this video<br><br>';
    

      



      // Generate entry to list for each comment
      data.Report.forEach(function(report, idx, array) {

        
        // get css style
        var elmnt = document.createElement("li")

        // Obtain the comment Author,, Link to Author's page, comment text,
        // number of replies and likes
        var flag_score = report.score;
       
        var flag_text = report.text;

        var flag_start=report.start;

        // Container for the Redflag score and start time.
        var div = document.createElement("a");
        div.innerHTML = 'At  '+flag_start;//+ ' the video is '+flag_score +'<br> Here is the text from that time:';
        div.setAttribute("class", "flag _description");
        // //provide link to author's page
        // div.setAttribute("href",comment_authorLink);
        var p = document.createElement("p");

        //comment text
        // <p style="color:blue;font-size:50px;"></p>
        p.innerHTML = '"' + flag_text + '"';
        // // Open a blank tab when the link is clicked.
        // p.setAttribute("target", "_blank");


        // // # of likes and replies
        // var p2 = document.createElement("p");

        // p2.innerHTML = Replies_likes;
        // // Open a blank tab when the link is clicked.
        // p2.setAttribute("target", "_blank");

        // put all elements together
        elmnt.appendChild(div);
        elmnt.appendChild(p);
        // elmnt.appendChild(p2);

        // Append the new comment to the list.
        report_text.appendChild(elmnt);

      });
    }
  });
  
}

// Trigger the function when DOM of the pop-up is loaded.
document.addEventListener('DOMContentLoaded', function() {

  load();

});

//#####################



function reset () {

  // set the icon to greyscale 
  chrome.browserAction.setIcon({path : "../../icons/Logo_greyscale.png"});

  // clean the local storage
  chrome.storage.local.clear(function () {
    console.log("Report reset");
  });
}

function get_report(url, personal){
  // this function fetches the red flags
  // of the video, stores them in local storage, sets extension icon to color and
  // calls the load function to put red flags in the new html of the extension.
  var api_server = "http://52.90.31.24:8000/"; //"http://127.0.0.1:8000/"; // the second address is for local use and testing



  // check to see if user is at a youtube video
  if (url.includes("https://www.youtube.com/watch?v=")) {


    var topic = url.replace("https://www.youtube.com/watch?v=", "");

    // URL for http requests
    var req_url = api_server + "submission/?video_id=" + topic;

    // Send http requests
    fetch(req_url)
    .then(r => r.text())
    .then(function(result) {
      result_json = JSON.parse(result);
      if (result_json.found) {
        // Store the fetched data into local memory for display
        chrome.storage.local.set({Report: result_json.Report, rating: result_json.rating}, function() {
          console.log("Found Report");
          // Change to colored icon
          chrome.browserAction.setIcon({path : "../../icons/Logo.png"});
          load();
            });
      }
    });
  }
  
  
}




document.getElementById('check').onclick = function() {
  // When submit button is clicked, this will execute the entire process 
  // of getting red flags, 
  // and entering them into the new html of the extension

  //var personal = document.getElementById('personal').value; this maybe used at a later date
  
  // clear the current storage, in case comments from a prevoius run are still in storage
  reset();

    // get current url, and use the video id in that url to fetch red flags
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
    get_report(url)//, personal)  
    });

};






