
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === "hello"){
      sendResponse({farewell: "goodbye"});
      openpage("./createwallet.html");
    }else if  ('message' in request&&request.message.name === "createaccount"){
      sendResponse({farewell: "createaccount recv"});
      chrome.windows.getCurrent((currentWindow) => {
        chrome.windows.remove(currentWindow.id,()=>{
          
        });
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