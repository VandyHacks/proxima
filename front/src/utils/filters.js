export function capitalizeFirstLetter (word) {
  let capitalizedWord = word;
  return capitalizedWord[0].toUpperCase() + capitalizedWord.substring(1);
}