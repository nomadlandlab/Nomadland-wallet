async function dx() {
    const src = chrome.runtime.getURL("./scripts/sendtx_bundle.js");
    await import(src)
}
dx()
function showTab(tabIndex) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    tabcontent[tabIndex - 1].classList.add("active");
    tablinks[tabIndex - 1].classList.add("active");
}

document.getElementById('tab1').addEventListener("click", function () {
    showTab(1);
});

document.getElementById('tab2').addEventListener("click", function () {
    showTab(2);
});

document.getElementById('btn_Reject').addEventListener("click", function () {
    chrome.windows.getCurrent((currentWindow) => {
        chrome.windows.remove(currentWindow.id,()=>{
          console.log("关闭窗口")
        });
      });
});