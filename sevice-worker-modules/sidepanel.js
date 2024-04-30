
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if ('SENDTX' in request){
        if (!sender.tab){
            console.log("From Chrome Extension");
            request.SENDTX.url= "Chrome Extension"
            sendResponse({farewell: "Chrome Extension"});  
        }else{
            sendResponse({farewell: sender.tab.url});
            request.SENDTX.url= sender.tab.url
        }
        chrome.storage.session.set({"TX":request.SENDTX }).then(() => {
            openpage("./sendTx.html");
        });
      }
    }
  );
  function openpage(pageurl) {
    chrome.windows.getCurrent((currentWindow) => {
        chrome.windows.update(currentWindow.id, { focused: true });
        let newWindowWidth = 394;
        let newWindowHeight = 627;
        let newWindowLeft = currentWindow.left + currentWindow.width - newWindowWidth-100;
        let newWindowTop = 20;
        chrome.windows.create({
            url: pageurl,
            type: "popup",
            width: newWindowWidth,
            height: newWindowHeight,
            left: newWindowLeft,
            top: newWindowTop
        }, (createdWindow) => {
            chrome.windows.update(createdWindow.id, { focused: true });
        });
    })
  }