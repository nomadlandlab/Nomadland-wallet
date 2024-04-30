



// async function dx() {
//   const src = await chrome.runtime.getURL("../scripts/txhashsee.js");
//   await import(src)
// }

// dx()


// let webSocket = null;
// let confirmedHashs=[]
// let myMap = new Map();  
// const TEN_SECONDS_MS = 15 * 1000;
// chrome.notifications.onClosed.addListener(async (notificationId)=>{
//   myMap.delete(notificationId); 
//   await chrome.notifications.clear(notificationId)
// });
// chrome.notifications.onButtonClicked.addListener(async (id,bid) => {
//     if(id!=undefined){
//     chrome.tabs.create({
//       url:'https://mainnet.ckb.dev/tx/'+myMap.get(id)
//     });
//     }
    
// });
// async function connect() {
//   webSocket = new WebSocket('wss://mainnet.ckb.dev/');
//   webSocket.onopen = (event) => {
//     console.log("wss link...");
//   };
//   webSocket.onerror=(event) => {
//     console.log("wss unlink...");
//   };
//   webSocket.onmessage = async (event) => {
//     let RES=JSON.parse(event.data);
//     if(RES.result==null){
     
//     }else{
//       let result=await chrome.storage.local.get(["TX"]);
//       if("TX" in result){

//       }else{
//         return
//       }
//       let list=result.TX;
//       for(let i=0;i<list.length;i++){
//         if(String(list[i].hash)==String(RES.result.transactionHash)){
//           let ARRY=await DecodeEvent(RES.result.logs)
//           if(ARRY[0]=='err'){
//             continue
//           }
//           if(ARRY[0]=='pass'){
//           }else{
//             list[i].addsub=ARRY[1]
//             list[i].amount=ARRY[2];
//           }
//           list[i].status=parseInt(RES.result.status, 16);
//           if(list[i].status!=-100){
//             confirmedHashs.push(list[i].hash)
//             try{
//               const response = await chrome.runtime.sendMessage({ uploadcontractaddress: RES.result.to });
//             }catch(er){
//               console.log(er)
//             }
//           }
//         }else{
//         }
//       }
//       await chrome.storage.local.set({TX:list})
//     }
//   };
//   webSocket.onclose = (event) => {
//     webSocket = null;
//   };
// }

// async function notificationsaddListener(){
//   const keepAliveIntervalId = setInterval(
//     async () => {
//       if (confirmedHashs.length>0) {
//         for(let i=0;i<confirmedHashs.length;i++){
//           let hash=confirmedHashs.pop()
//           let notificationId=await chrome.notifications.create({
//             type: 'basic',
//             iconUrl: '../images/nevers-logo.png',
//             title: 'Confirmed transaction',
//             message: "Transaction confirmed!",
//             buttons: [{ title: 'View onExplorer.' }],
//             priority: 2,
//           });
//           myMap.set(notificationId,hash)
//         }
//       }
//     },
//     TEN_SECONDS_MS/10
//   );
// }

// function disconnect() {
//   if (webSocket) {
//     webSocket.close();
//   }
// }

// function keepAlive() {
//   const keepAliveIntervalId = setInterval(
//     () => {
//       if (webSocket) {
//         //console.log('ping');
//         webSocket.send('ping');
//       } else {
//         clearInterval(keepAliveIntervalId);
//       }
//     },
//     // It's important to pick an interval that's shorter than 30s, to
//     // avoid that the service worker becomes inactive.
//     TEN_SECONDS_MS
//   );
// }
// connect();
// LoopTxSee();
// notificationsaddListener();

// function GetTxStaut(txhash,timems){
//   setTimeout(()=>{
//     let data={
//       "jsonrpc":"2.0",
//       "id": generateRandomString("8aaf7aca-f97d-4dae-972c-4acfb1b1efbc".length),
//       "method": "eth_getTransactionReceipt",
//       "params": [txhash]
//     };
//     webSocket.send(JSON.stringify(data));
//   }, timems);
 
// }
// function generateRandomString(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }
// //循环看交易
// async function LoopTxSee(){
//   const keepAliveIntervalId = setInterval(
//    async () => {
//       let result=await chrome.storage.local.get(["TX"]);
//       if("TX" in result){
//           let list=result.TX;
//           for(let i=0;i<list.length;i++){
//             if(list[i].status==-100){
//               if(list[i].op=="transfer_ckb"){
//                 let status=await GetTxStautCKB(list[i].hash);
//                 console.log("GetTxStautCKB status=",status);
//               }else if (list[i].op=="transfer_eth"){

//               }else if (list[i].op=="transfer_btc"){
                
//               }
             
//             }
//           }
//       }
//     },
//     TEN_SECONDS_MS
//   );
// }

// //查询交易
// async function GetTxStautCKB(txhash){
  
// }





// async function DecodeEvent(logs){
//   let result=await chrome.storage.session.get(["myaddress"])
//   let myaddr=""
//   if("myaddress" in  result){
//     myaddr=(result.myaddress).toLowerCase()
//   }else{
//     return['err',"?",'']
//   }
//   for(let i=0;i<logs.length;i++){
//     for(let m=0;m<logs[i].topics.length;m++){
//       if(logs[i].topics[0]=="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"){
//         let ff=logs[i].topics[1]
//         let tt=logs[i].topics[2]
//         ff=ff.replace("0x", "");
//         tt=tt.replace("0x", "");
//         ff="0x"+ff.substring(ff.length - 40, ff.length);
//         tt="0x"+tt.substring(tt.length - 40, tt.length);
//         let B_Amount=BigInt(logs[i].data)
//         if(myaddr==tt&&myaddr==ff){
//           return['',"+",'transfer to self']
//         }else if(myaddr==tt){
//           if(B_Amount<BigInt(10000000000000)){
//             return['',"+",'<0.00001']
//           }else{
//             return['',"+",toFloatr(B_Amount).toFixed(5).toString()]
//           }
//         }else if(myaddr==ff){
//           if(B_Amount<BigInt(10000000000000)){
//             return['',"-",'<0.00001']
//           }else{
//             return['',"-",toFloatr(B_Amount).toFixed(5).toString()]
//           }
//         }
       
//       }
//     }
//   }
//   return['pass','','']
// }

// function toFloatr(a) {
//   return Number((BigInt(a) / BigInt(10 ** 10)).toString(10)) / 100000000.0
// }