// var port = chrome.runtime.connect();
const nomadland_get_account = "nomadland_get_account"

window.addEventListener("message", async (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return;
  }
  if (event.data.type && (event.data.type === nomadland_get_account)) {
    // console.log("Content script received: " + event.data.text);
    await chrome.runtime.sendMessage({wallet_call: nomadland_get_account});
  }else if(event.data.action && (event.data.action === "send_tx")){
    if (ISCONNECT){
      // console.log("Content script received: " + event.data.action);
      await chrome.runtime.sendMessage({wallet_call: event.data});
    }else{
      window.postMessage(
        {
          type:"call_wallet",
          code:-1,
          function:event.data.action,
          msg:"not connect wallet",
        },
        "*"
      );
    }
  }
}, false);



let ISCONNECT=false
chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
   if ('windowcontext' in request) {
      //call-wallet
      // console.log("dom get",sender,request.windowcontext);
      if (request.windowcontext.name == nomadland_get_account) {
        //登录解锁
        ISCONNECT=true
        window.postMessage(
          request.windowcontext,
          "*"
        );
      }else if (request.windowcontext.name == "hash"||request.windowcontext.name == "signtx"||request.windowcontext.name == "reject") {
        window.postMessage(
          request.windowcontext,
          "*"
        );
      }
    }

  }
);
