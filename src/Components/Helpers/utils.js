function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function shouldHandleShortcutEvent(tagName) {
  const lowerCaseTagName = tagName.toLowerCase();
  return !(['input', 'select', 'textarea'].includes(lowerCaseTagName));
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export { sleep, shouldHandleShortcutEvent, getRandom };
