const nomadland_get_account = "nomadland_get_account"
const nomadland_send_ckb = "nomadland_send_ckb"
const nomadland_send_eth = "nomadland_send_eth"
const nomadland_send_btc = "nomadland_send_btc"
const nomadland_send_ckb_xudt = "nomadland_send_ckb_xudt"
const nomadland_charge_ckb_xudt = "nomadland_charge_ckb_xudt"
const nomadland_signrawtx_ckb = "nomadland_signrawtx_ckb"
const nomadland_signrawtx_ckb_dobs = "nomadland_signrawtx_ckb_dobs"
const nomadland_send_btc_xudt = "nomadland_send_btc_xudt"
const nomadland_send_ckb_xudt_sign="nomadland_send_ckb_xudt_sign"
const nomadland_send_ckb_dobs_sign="nomadland_send_ckb_dobs_sign"
const nomadland_send_ckb_sign="nomadland_send_ckb_sign"
chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    if (request.greeting === "hello") {
      sendResponse({ farewell: "goodbye" });
      openpage("./createwallet.html");
    } else if ('message' in request && request.message.name === "createaccount") {
      sendResponse({ farewell: "createaccount recv" });
      chrome.windows.getCurrent((currentWindow) => {
        chrome.windows.remove(currentWindow.id, () => {

        });
      });
    } else if ('wallet_call' in request) {
      //call-wallet
      console.log("sever get");

      if (request.wallet_call == nomadland_get_account) {
        //判断是否登录解锁
        let url = sender.tab.url
        console.log(request.wallet_call, url, sender.tab.id);
        await chrome.storage.local.set({ "sendertaburl": url })
        await chrome.storage.local.set({ "sendertabid": sender.tab.id })
        openpage("./aut.html");
        //get account
        console.log(nomadland_get_account, sender.tab.url)

      } //CKB
      else if (request.wallet_call.type && request.wallet_call.type == nomadland_send_ckb) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress);
        let txjson = {
          "type": "transfer",
          "to": request.wallet_call.toaddress,
          "toaddr": "ckb",
          "op": "transfer_ckb",
          "mintprice": (BigInt((Number(request.wallet_call.amount) * 10 ** 8).toFixed(0))).toString(),
          "url": url,
        }
        await ChangeChain(0)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }
      else if (request.wallet_call.type && request.wallet_call.type == nomadland_send_ckb_sign) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress);
        let txjson = {
          "type": "sign",
          "to": request.wallet_call.toaddress,
          "toaddr": "ckb",
          "op": "transfer_ckb",
          "mintprice": (BigInt((Number(request.wallet_call.amount) * 10 ** 8).toFixed(0))).toString(),
          "url": url,
        }
        await ChangeChain(0)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }
      //ETH
      else if (request.wallet_call.type && request.wallet_call.type == nomadland_send_eth) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress);
        let txjson = {
          "type": "transfer",
          "to": request.wallet_call.toaddress,
          "toaddr": "eth",
          "op": "transfer_eth",
          "mintprice": ((BigInt(Number(request.wallet_call.amount)*10**10) * BigInt(10 ** 8))).toString(),
          "url": url,
        }
        await ChangeChain(2)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }
      //BTC
      else if (request.wallet_call.type && request.wallet_call.type == nomadland_send_btc) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress);
        let txjson = {
          "type": "transfer",
          "to": request.wallet_call.toaddress,
          "toaddr": "btc",
          "op": "transfer_btc",
          "mintprice": (BigInt((Number(request.wallet_call.amount) * 10 ** 8).toFixed(0))).toString(),
          "url": url,
        }
        await ChangeChain(1)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }
      //XUDT-CKB
      else if (request.wallet_call.type && request.wallet_call.type == nomadland_send_ckb_xudt) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress);
        let txjson = {
          "type": "transfer",
          "to": request.wallet_call.toaddress,
          "toaddr":request.wallet_call.args,
          "op": "transfer_xudt",
          "mintprice": (BigInt((Number(request.wallet_call.amount) * 10 ** 8).toFixed(0))).toString(),
          "url": url,
        }
        await ChangeChain(0)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }//XUDT-BTC
      else if (request.wallet_call.type && request.wallet_call.type == nomadland_send_btc_xudt) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress);
        let txjson = {
          "type": "transfer",
          "to": request.wallet_call.toaddress,
          "toaddr":request.wallet_call.args,
          "op": "transfer_xudt_b",
          "mintprice": (BigInt((Number(request.wallet_call.amount) * 10 ** 8).toFixed(0))).toString(),
          "url": url,
        }
        await ChangeChain(1)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }else if (request.wallet_call.type && request.wallet_call.type == nomadland_send_ckb_xudt_sign) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress);
        let txjson = {
          "type": "sign",
          "to": request.wallet_call.toaddress,
          "toaddr":request.wallet_call.args,
          "op": "transfer_xudt",
          "mintprice": (BigInt((Number(request.wallet_call.amount) * 10 ** 8).toFixed(0))).toString(),
          "url": url,
        }
        await ChangeChain(0)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }//xudt charge
      else if (request.wallet_call.type && request.wallet_call.type == nomadland_charge_ckb_xudt) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress,request.wallet_call.txhash+"#"+request.wallet_call.index);
        let txjson = {
          "type": "transfer",
          "to": request.wallet_call.toaddress,
          "toaddr":request.wallet_call.args,
          "op": "charge_xudt",
          "mintprice": request.wallet_call.txhash+"#"+request.wallet_call.index,
          "url": url,
        }
        await ChangeChain(0)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }//xudt sign raw tx
      else if (request.wallet_call.type && (request.wallet_call.type == nomadland_signrawtx_ckb||
        request.wallet_call.type == nomadland_signrawtx_ckb_dobs)) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id);
        let txjson = {
          "type": request.wallet_call.type,
          "to": request.wallet_call.type,
          "toaddr":request.wallet_call.info,
          "op": request.wallet_call.type,
          "mintprice": request.wallet_call.unsigntx,
          "url": url,
        }
        await ChangeChain(0)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }
      else if (request.wallet_call.type && request.wallet_call.type == nomadland_send_ckb_dobs_sign) {
        let url = sender.tab.url
        console.log(request.wallet_call.type, url, sender.tab.id, request.wallet_call.toaddress);
        let txjson = {
          "type": "sign",
          "to": request.wallet_call.toaddress,
          "toaddr":request.wallet_call.args,
          "op": "transfer_dobs",
          "mintprice": "1",
          "url": url,
        }
        await ChangeChain(0)
        await chrome.storage.session.set({ "TX": txjson }).then(() => {
          openpage("./sendTx.html");
        });
      }
    }

  }
);

//切换网络
async function ChangeChain(chianNumber) {
  let retprk = await chrome.storage.session.get(["ACCOUNT"])
  if ("ACCOUNT" in retprk) {
    await chrome.storage.local.set({ "CHAIN": chianNumber })
    if (chianNumber == 0) {
      //ckb
      let Res_CKB_NOWADDRESS= await chrome.storage.local.get(["CKB_NOWADDRESS"])
      await chrome.storage.local.set({ "NOWADDRESS": Res_CKB_NOWADDRESS.CKB_NOWADDRESS })
    } else if (chianNumber == 1) {
      let Res_BTC_NOWADDRESS= await chrome.storage.local.get(["BTC_NOWADDRESS"])
      await chrome.storage.local.set({ "NOWADDRESS": Res_BTC_NOWADDRESS.BTC_NOWADDRESS })
    } else if (chianNumber == 2) {
      let Res_ETH_NOWADDRESS= await chrome.storage.local.get(["ETH_NOWADDRESS"])
      await chrome.storage.local.set({ "NOWADDRESS": Res_ETH_NOWADDRESS.ETH_NOWADDRESS })
    }
  }

}




















function openpage(pageurl) {
  chrome.windows.getCurrent((currentWindow) => {
    chrome.windows.update(currentWindow.id, { focused: true });
    let newWindowWidth = 394;
    let newWindowHeight = 627;
    let newWindowLeft = currentWindow.left + currentWindow.width - newWindowWidth - 100;
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