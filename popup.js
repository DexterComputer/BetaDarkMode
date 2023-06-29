document.getElementById('startAutoclickButton').addEventListener('click', startAutoclick);
document.getElementById('stopAutoclickButton').addEventListener('click', stopAutoclick);
document.getElementById('startAutoRefreshButton').addEventListener('click', startAutoRefresh);
document.getElementById('stopAutoRefreshButton').addEventListener('click', stopAutoRefresh);

function startAutoclick() {
  const interval = parseInt(document.getElementById('interval').value);
  const repetitions = parseInt(document.getElementById('repetitions').value);
  const x = parseInt(document.getElementById('x').value);
  const y = parseInt(document.getElementById('y').value);

  chrome.runtime.sendMessage({ action: 'startAutoclick', interval, repetitions, x, y }, () => {});
}

function stopAutoclick() {
  chrome.runtime.sendMessage({ action: 'stopAutoclick' }, () => {});
}

function startAutoRefresh() {
  const refreshInterval = parseInt(document.getElementById('refreshInterval').value);

  chrome.runtime.sendMessage({ action: 'startAutoRefresh', refreshInterval }, () => {});
}

function stopAutoRefresh() {
  chrome.runtime.sendMessage({ action: 'stopAutoRefresh' }, () => {});
}
