

function injectVideo(title) {
    const solutionsTab = document.querySelectorAll('div.w-full.flex-col.overflow-auto')[1];
    if (solutionsTab) {
        const existingIframe = solutionsTab.parentElement.querySelector('iframe');
        if (!existingIframe) {
            const iframe = document.createElement("iframe");
            iframe.src = "https://www.youtube.com/embed/KLlXCFG5TnA";
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            solutionsTab.parentElement.insertBefore(iframe, solutionsTab);
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'injectVideo') {
        console.log('injected the video');
        let title = request.title.split('-')[0].trim();
        injectVideo(title);
    }
});

