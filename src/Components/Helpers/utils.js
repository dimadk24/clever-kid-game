function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function shouldHandleShortcutEvent(tagName) {
  const lowerCaseTagName = tagName.toLowerCase();
  return !(['input', 'select', 'textarea'].includes(lowerCaseTagName));
}

export { sleep, shouldHandleShortcutEvent };
