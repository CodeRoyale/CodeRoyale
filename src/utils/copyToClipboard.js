export const copyToClipboard = (copyTextRef) => {
  var range = document.createRange();
  range.selectNode(copyTextRef.current);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
};
