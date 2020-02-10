
function reset () {

	// set the icon to greyscale 
	chrome.browserAction.setIcon({path : "../../icons/Logo_greyscale.png"});

	// clean the local storage
	chrome.storage.local.clear(function () {
		console.log("Report reset");
	});
}

reset();




// // Add a listenser when DOM is loaded.
chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {

	//reset when reload
	reset();

	
});
