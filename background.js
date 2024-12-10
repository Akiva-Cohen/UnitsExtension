//open setting page
chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
        url: "settings.html"
    });
});

//set initial settings
chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
        //add in initial set code
    }
});