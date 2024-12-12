let a = false;
a = new Promise((resolve) => {
    chrome.storage.local.get(["on"], function (output) {
        x = output.on;
        resolve(x);
    });
});
document.getElementById("onOff").checked = a;
document.getElementById("onOff").addEventListener("change", function () {
    if (document.getElementById("onOff").checked) {
        chrome.storage.local.set({"on":true});
    } else {
        chrome.storage.local.set({"on":false});
    }
})