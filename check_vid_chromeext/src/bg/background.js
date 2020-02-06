
function reset () {

	// set the icon to greyscale 
	chrome.browserAction.setIcon({path : "../../icons/Logo_greyscale.png"});

	// clean the local storage
	chrome.storage.local.clear(function () {
		console.log("Report reset");
	});
}

reset();

// // API server IP
// var api_server = "http://52.90.31.24:8000/";

// // Add a listenser when DOM is loaded.
chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {

	// var url = details.url;
	reset();

	// If en.wikipedia.org is nativaged.
	// if (url.includes("https://www.youtube.com/watch?v=")) {

	// 	var topic = url.replace("https://www.youtube.com/watch?v=", "");

	// 	// URL for http requests
	// 	var req_url = api_server + "submission/?video_id=" + topic;

	// 	// Send http requests
	// 	fetch(req_url)
	// 	.then(r => r.text())
	// 	.then(function(result) {
	// 		result_json = JSON.parse(result);
	// 		if (result_json.found) {
	// 			// Store the fetched data into local memory for display
	// 			chrome.storage.local.set({Report: result_json.Report, rating: result_json.rating}, function() {
	// 				console.log("Found Report");
	// 				// Change to colored icon
	// 				chrome.browserAction.setIcon({path : "../../icons/Logo.png"});
 //        		});
	// 		}
	// 	});
	// }
});
