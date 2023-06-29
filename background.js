chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startAutoclick') {
    startAutoclick(message.interval, message.repetitions, message.x, message.y);
  } else if (message.action === 'stopAutoclick') {
    stopAutoclick();
  }
});

let intervalId;

function startAutoclick(interval, repetitions, x, y) {
  let count = 0;

  intervalId = setInterval(() => {
    if (count >= repetitions) {
      clearInterval(intervalId);
      return;
    }

    count++;
    clickAtPosition(x, y);
  }, interval);
}

function stopAutoclick() {
  clearInterval(intervalId);
}

function clickAtPosition(x, y) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: (pos) => {
        window.scrollTo(pos.x, pos.y);
        const element = document.elementFromPoint(pos.x, pos.y);
        element.click();
      },
      args: [{ x, y }],
    });
  });
}
