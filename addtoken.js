async function dx() {
    const src = await chrome.runtime.getURL("./scripts/addtoken.js");
    await import(src)
}

dx()