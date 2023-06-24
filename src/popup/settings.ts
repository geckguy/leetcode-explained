document.getElementById('home-button')!.onclick = () => {
    window.location.href = 'popup.html';
};

document.addEventListener('DOMContentLoaded', (event) => {
    chrome.storage.local.get(['hideTags'], (result) => {
        const hideTagsBtnTextElement = document.getElementById('toggle-show-tags-text');
        if (result.hideTags) {
            hideTagsBtnTextElement.textContent = `❌`;
        } else {
            hideTagsBtnTextElement.textContent = `✅`;
        }
    });
});

// Getting element and checking if the language is already set in local storage
let languageSelect = document.getElementById('language-select');
chrome.storage.local.get('language', function (data) {
    if (data.language) {
        languageSelect!.value = data.language;
    } else {
        languageSelect!.value = 'python';
    }
});

// Change the language on selection
languageSelect!.onchange = function () {
    let selectedLanguage = this.value;
    chrome.storage.local.set({ language: selectedLanguage });
};

// Get font fize and check if it is already set in local storage
let fontSizeSelect = document.getElementById('font-size-select');
chrome.storage.local.get('fontSize', function (data) {
    if (data.fontSize) {
        fontSizeSelect!.value = data.fontSize;
        // Add this line to set the font size in your CSS variables when the page loads
        document.documentElement.style.setProperty('--dynamic-font-size', `${data.fontSize}px`);
    }
});

fontSizeSelect!.onchange = function () {
    let selectedFontSize = this.value;
    chrome.storage.local.set({ fontSize: selectedFontSize });
    // Add this line to set the font size in your CSS variables every time the font size is changed
    document.documentElement.style.setProperty('--dynamic-font-size', `${selectedFontSize}px`);
};

document.getElementById('hide-tags-btn')!.addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'addCompanies' })
    chrome.storage.local.get(['hideTags'], (result) => {
        const newHideTags = !result.hideTags;
        chrome.storage.local.set({ hideTags: newHideTags }, () => {
            document.getElementById('toggle-show-tags-text')!.textContent = newHideTags ? '❌' : '✅';
        });
    });
});


function sendMessageToActiveTab(message: object): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id!, message);
    });
}