
function halfstr(str) {
    return str.substr(0, 7) + "****" + str.substr(str.length - 7, 7)
}
async function dx() {
    const src = await chrome.runtime.getURL("./scripts/bundle.js");
    const src2 = await chrome.runtime.getURL("./scripts/txhashsee.js");
    await import(src)
    await import(src2)
}

dx()
document.getElementById("closeinputsend").addEventListener('click',()=>{
    hiddensenddobs_div()
  })
  function hiddensenddobs_div(){
    document.getElementById("senddobs_div").style.visibility="hidden"
  }
try {
    document.getElementById('myweb').addEventListener('click', async function () {
        chrome.tabs.create({
            url: 'https://nomadland.io/'
        });
    });
} catch {

}


try {
    document.getElementById('export_btn').addEventListener('click', async function () {
        openpage("./export-key.html");
    });
} catch {

}
try {
    document.getElementById('Pools_btn').addEventListener('click', async function () {
        chrome.tabs.create({
            url: 'https://market.nomadland.io/'
        });
        // const [tab] = await chrome.tabs.query({
        //     active: true,
        //     lastFocusedWindow: true
        // });
        // const tabId = tab.id;
        // await chrome.sidePanel.open({ tabId });
        // await chrome.sidePanel.setOptions({
        //     tabId,
        //     path: 'sidepanel.html',
        //     enabled: true,
        // });
    });
} catch {

}

try {
    document.getElementById('blastweb').addEventListener('click', async function () {
        if(document.getElementById('chain_div').style.visibility=="hidden"){
            document.getElementById('chain_div').style.visibility="visible"
        }else{
            document.getElementById('chain_div').style.visibility="hidden"
        }
    });
} catch {

}

let iscopyaddr = false
try {
    document.getElementById('copyaddr_btn').addEventListener('click', async function () {
        if (iscopyaddr) { return }
        chrome.storage.local.get(["NOWADDRESS"]).then((result) => {
            if("NOWADDRESS" in result){
                navigator.clipboard.writeText(result.NOWADDRESS)
                .then(() => {
                    document.getElementById('ico_copy').src = "../images/copy.svg"
                })
                .catch((error) => { alert(`Copy failed! ${error}`) })
            iscopyaddr = true
            setTimeout(() => {
                iscopyaddr = false
                document.getElementById('ico_copy').src = "../images/copy.png"
            }, "5000")
            }else {
                console.log("null")
            }
        });

    });
} catch {

}


let isshowpass = false
try {
    document.getElementById('showpass_btn').addEventListener('click', async function () {
        if (isshowpass) {
            isshowpass = false
            document.getElementById('pass1').type = 'password'
            document.getElementById('showpass_btn').innerHTML = "<svg  width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 cursor-pointer'><g stroke='currentColor' stroke-width='2' stroke-linecap='round'><path d='M3.056 9A11.97 11.97 0 0012 13c3.47 0 6.596-1.473 8.787-3.827M19 11l2 2.5M14.25 13l.482 3.165M9.165 13L8 15.982M5.455 11l-2.076 2.438'></path></g></svg>"
        } else {
            isshowpass = true
            document.getElementById('showpass_btn').innerHTML = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 cursor-pointer'><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path><path d='M12 15a3 3 0 100-6 3 3 0 000 6z' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>"
            document.getElementById('pass1').type = 'text'
        }
    });
} catch {

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
try{
    document.getElementById('setting_btn').addEventListener('click',()=>{
        if(document.getElementById('setting_div').style.visibility=="hidden"){
            document.getElementById('setting_div').style.visibility="visible"
        }else{
            document.getElementById('setting_div').style.visibility="hidden"
        }
        
    })
    document.getElementById('Xtwitter_btn').addEventListener('click',()=>{
        chrome.tabs.create({
            url: 'https://twitter.com/nomadlandio'
        });
    })
    document.getElementById('Discord_btn').addEventListener('click',()=>{
        chrome.tabs.create({
            url: 'https://t.me/+5UjDPv-dyx8yOWNl'
        });
    })
    document.getElementById('Lockwallet_btn').addEventListener('click',()=>{
        chrome.storage.session.clear()
        chrome.windows.getCurrent((currentWindow) => {
            chrome.windows.update(currentWindow.id, { focused: true });
        })
    })
    document.getElementById('AddToken_btn').addEventListener('click',()=>{
        openpage("./addtoken.html");
    })
    
}catch(err){
    console.log(err);
}


// async function Test(nu){
//     let isomorphic = {
//         "btcTxId":"123"+nu,
//         "btcTxBytes": "456",
//         "ckbRawTx": "789",
//     }
//     // JSON.stringify(isomorphic)
//     let list=[]
//     let List_isomorphic=await chrome.storage.local.get(["isomorphic"])
//     if("isomorphic" in List_isomorphic){
//         console.log("有",List_isomorphic.isomorphic);
//         list=(List_isomorphic.isomorphic)
//         list.push(isomorphic)
//         // let jlist=JSON.stringify(list)
//         await chrome.storage.local.set({"isomorphic":list})
//     }else{
//         console.log("空");
//         list.push(isomorphic)
//         // let jlist=JSON.stringify(list)
//         await chrome.storage.local.set({"isomorphic":list})
//     }
//     await chrome.storage.local.set({"isomorphic":list})
//     let List_isomorphic2=await chrome.storage.local.get(["isomorphic"])
//     console.log("WYYYYYY",List_isomorphic2.isomorphic);
    

// }
// Test(4)