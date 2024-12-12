let a = false;
a = new Promise((resolve) => {
    chrome.storage.local.get(["on"], function (output) {
        x = output.on;
        resolve(x);
    });
});
document.getElementById("onOff").checked = a;