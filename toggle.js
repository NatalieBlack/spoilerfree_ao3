const storageAttr = 'sfao3'
let toggleButton = document.querySelector('#toggle')

async function updateUI() {
    
    const result = await browser.storage.local.get(storageAttr);
    const enabled = result[storageAttr] ?? false;

    toggleButton.textContent = enabled ? "show everything" : "hide everything";
    toggleButton.dataset[storageAttr] = enabled;
}


toggleButton.addEventListener("click", async () => {
    const currentState = toggleButton.dataset[storageAttr] === "true";
    const newState = !currentState;

    await browser.storage.local.set({ [storageAttr]: newState });
    updateUI();
});

updateUI();
