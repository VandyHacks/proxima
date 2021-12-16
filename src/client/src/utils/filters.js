export function capitalizeFirstLetter(word) {
  return word.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export function replaceUnderscores(word) {
  return word.replace(/_/g, " ");
}