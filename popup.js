document.getElementById('startButton').addEventListener('click', startAutoclick);
document.getElementById('stopButton').addEventListener('click', stopAutoclick);

function startAutoclick() {
  const interval = parseInt(document.getElementById('interval').value);
  const repetitions = parseInt(document.getElementById('repetitions').value);
  const x = parseInt(document.getElementById('x').value);
  const y = parseInt(document.getElementById('y').value);

  chrome.runtime.sendMessage({ action: 'startAutoclick', interval, repetitions, x, y });
}

function stopAutoclick() {
  chrome.runtime.sendMessage({ action: 'stopAutoclick' });
}
