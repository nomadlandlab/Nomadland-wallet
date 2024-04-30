
async function dx() {
    const src = chrome.runtime.getURL("./scripts/bundle.js");
    await import(src)
}
dx()
try {
    document.getElementById('btn_Create').addEventListener('click', function () {
        window.location.href = './wallet-pass.html'
    });
} catch {

}
let iscopyaddr = false
try {
    document.getElementById('copyaddr_btn').addEventListener('click', async function () {
        if (iscopyaddr) { return }
        chrome.storage.session.get(["ACCOUNT"]).then((result) => {
            try {
                if ("ACCOUNT" in result) {
                    navigator.clipboard.writeText(result.ACCOUNT)
                        .then(() => {
                            document.getElementById('ico_copy').innerHTML = "<path fill='currentColor' d='M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41z'></path>"
                        })
                        .catch((error) => { alert(`Copy failed! ${error}`) })
                    iscopyaddr = true
                    setTimeout(() => {
                        iscopyaddr = false
                        document.getElementById('ico_copy').innerHTML = "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'><path d='M19.4 20H9.6a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6'></path><path d='M15 9V4.6a.6.6 0 0 0-.6-.6H4.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H9'></path></g>"
                    }, "5000")
                } else {
                    console.log("no account")
                }
            } catch {

            }
        });

    });
} catch {

}