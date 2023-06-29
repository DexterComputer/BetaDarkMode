let intervalId;
let refreshIntervalId;

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startAutoclick') {
    startAutoclick(message.interval, message.repetitions, message.x, message.y);
  } else if (message.action === 'stopAutoclick') {
    stopAutoclick();
  } else if (message.action === 'startAutoRefresh') {
    startAutoRefresh(message.refreshInterval);
  } else if (message.action === 'stopAutoRefresh') {
    stopAutoRefresh();
  }
});

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

function startAutoRefresh(refreshInterval) {
  refreshIntervalId = setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  }, refreshInterval);
}

function stopAutoRefresh() {
  clearInterval(refreshIntervalId);
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
