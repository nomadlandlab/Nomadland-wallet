async function dx() {
    const src = await chrome.runtime.getURL("./scripts/aut.js");
    await import(src)
}

dx()