
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
  // this function fetches the comments relevant to the time solt (start, start+duration)
  // of the video, stores them in local storage, sets extension icon to color and
  // calls the load function to put comments in the new html of the extension.
  var api_server = "http://127.0.0.1:8000/"; //"http://52.90.31.24:8000/"; 



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
  // of getting relevant comments to selected portion of the video, 
  // and entering them into the new html of the extension

  //get start and duration times as strings
  //var personal = document.getElementById('personal').value;
  
  // clear the current storage, in case comments from a prevoius run are still in storage
  reset();

    // get current url, and use the video id in that url to fetch comments
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
    get_report(url)//, personal)  
    });

};








//#####################################
//   COMMENT PROJECT





// function load() {

//   // Get the comment_list container 
//   var comment_list = document.getElementById("comment_list");
  


//   // Retrieve data from local memory
//   chrome.storage.local.get("comments", function(data) {

//     // If the data is updated
//     if(typeof(data.comments) !== "undefined") {

//       comment_list.innerHTML = "";

//       // Generate entry to list for each comment
//       data.comments.forEach(function(comment, idx, array) {

        
//         // get css style
//         var elmnt = document.createElement("li")

//         // Obtain the comment Author,, Link to Author's page, comment text,
//         // number of replies and likes
//         var comment_author = comment.Author+':';
//         var comment_authorLink = comment.Author_link;
       
//         var comment_text = comment.comment_text;

//         var Replies_likes= 'Replies: ' +comment.Replies +' Likes: '+comment.likes;

//         // Container for the comments Author.
//         var div = document.createElement("a");
//         div.innerHTML = comment_author;
//         div.setAttribute("class", "title");
//         //provide link to author's page
//         div.setAttribute("href",comment_authorLink);
//         var p = document.createElement("p");

//         //comment text
//         p.innerHTML = comment_text;
//         // // Open a blank tab when the link is clicked.
//         // p.setAttribute("target", "_blank");


//         // # of likes and replies
//         var p2 = document.createElement("p");

//         p2.innerHTML = Replies_likes;
//         // // Open a blank tab when the link is clicked.
//         // p2.setAttribute("target", "_blank");

//         // put all elements together
//         elmnt.appendChild(div);
//         elmnt.appendChild(p);
//         elmnt.appendChild(p2);

//         // Append the new comment to the list.
//         comment_list.appendChild(elmnt);

//       });
//     }
//   });
  
// }



// function reset () {

//   // set the icon to greyscale 
//   chrome.browserAction.setIcon({path : "../../icons/Logo_greyscale.png"});

//   // clean the local storage
//   chrome.storage.local.clear(function () {
//     console.log("Comments reset");
//   });
// }

// function get_comments(url, start, duration){
//   // this function fetches the comments relevant to the time solt (start, start+duration)
//   // of the video, stores them in local storage, sets extension icon to color and
//   // calls the load function to put comments in the new html of the extension.


//   // check to see if user is at a youtube video
//   if (url.includes("https://www.youtube.com/watch?v=")) {
//     //get video id
//     var topic = url.replace("https://www.youtube.com/watch?v=", "");


//     // URL for http requests
//     var api_server = "http://127.0.0.1:8000/ ";
//     var req_url = api_server + "submission/?video_id=" + topic+'&start='+start+'&duration='+duration;

//     // Send http requests
//     fetch(req_url)
//     .then(r => r.text())
//     .then(function(result) {
//       result_json = JSON.parse(result);
//       if (result_json.found) {
//         // Store the fetched data into local memory for display
//         chrome.storage.local.set({comments: result_json.comments}, function() {
//           console.log("Found comments");
//           // Change to colored icon
//           chrome.browserAction.setIcon({path : "../../icons/Logo.png"});
//           // call load to place new commetns as new html
//           load();
//           });
//       }
//     });
//   }
  
  
// }


// function clockToSec(clockString){
//      //  split time string by ':'
//   var a = clockString.split(':'); 

//   // convert to sconds and make string
//   return ((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])).toString();
// }

// document.getElementById('submit').onclick = function() {
// 	// When submit button is clicked, this will execute the entire process 
// 	// of getting relevant comments to selected portion of the video, 
// 	// and entering them into the new html of the extension

//   //get start and duration times as strings
//   var start = clockToSec(document.getElementById('Start').value);
//   var duration = clockToSec(document.getElementById('Duration').value);
//   // clear the current storage, in case comments from a prevoius run are still in storage
//   reset();

//     // get current url, and use the video id in that url to fetch comments
//   chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//     url = tabs[0].url;
//     get_comments(url,start,duration)  
//     });

// };


//################################################################################
// EVERYTHING Below is scrap.

// var empty=true
      // i=0
      // while (empty) {
      //   // i++
      //   load();
      //   empty=false;
      //   // if (i === 3) {
      //   //   break;
      //   // }
      // }

      // while ( i<10 ) {
      //   chrome.storage.local.get("comments", function(data){
      //     if(typeof(data.comments) !== "undefined") {
      //       empty=false;
      //       load();
      //     };
      //   });
      //   i++ 
      // };
      

      // var event_list = document.getElementById("comment_list");
      // event_list.innerHTML =i

      

      // let myFirstPromise = new Promise((resolve, reject) => {
      //   get_comments(url)
      //   resolve('hi');
      // });
      // myFirstPromise.then((successMessage) => {
      //   console.log(successMessage)
      //   load();
      // });

      // get_comments(url,function() {
      //   load()
      // });


      // function first() {
      //   return new Promise(resolve => {
      //     resolve(get_comments(url))
      //     // setTimeout(() => {
      //     //   resolve('resolved');
      //     // }, 2000);
      //   });
      // }

      // async function asyncCall() {
      //   //console.log('calling');
      //   var result = await first();
      //   load(result);
      //   // expected output: 'resolved'
      // }
      // asyncCall();


      // function firstFunction(_callback){
      //   get_comments(url)
      //   _callback();
      // }
      // function secondFunction(){
      //   firstFunction(function() {
      //     load();
      //     });
        
      // }
      // secondFunction();

      // get_comments(url);

      
      // setTimeout(function(){ load(); }, 5000);
      // load();





    // load();

    // ##########

  // // var url = details.url;
  //   reset();

  // // If en.wikipedia.org is nativaged.
  //   if (url.includes("https://www.youtube.com/watch?v=")) {

  //     var topic = url.replace("https://www.youtube.com/watch?v=", "");

  //     // URL for http requests
  //     var req_url = api_server + "submission/?video_id=" + topic;

  //     // Send http requests
  //     fetch(req_url)
  //     .then(r => r.text())
  //     .then(function(result) {
  //       result_json = JSON.parse(result);
  //       if (result_json.found) {
  //         // Store the fetched data into local memory for display
  //         chrome.storage.local.set({comments: result_json.comments}, function() {
  //           console.log("Found comments");
  //           // Change to colored icon
  //           chrome.browserAction.setIcon({path : "../../icons/Logo.png"});
  //             });
  //       }
  //     });
  //   }


    // ##########

    //chrome.extension.getBackgroundPage().get_comments(url)
    // var event_list = document.getElementById("comment_list");
    // event_list.innerHTML =chrome.tabs.url
    //load();
    



// // Trigger the function when DOM of the pop-up is loaded.
// document.addEventListener('DOMContentLoaded', function() {

//   load();

// });