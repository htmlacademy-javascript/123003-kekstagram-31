const checkStringLength = (string = '', maxLength = 1) =>
  string.length <= maxLength;

const isPalindrom = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += reversedString + string[i];
  }
  return string === reversedString;
};

const translateStringToNumbers = (string = '') => {
  const extracedNumbers = [...string]
    .filter((word) => !isNaN(parseInt(word, 10)))
    .join('');
  return extracedNumbers;
};

checkStringLength('lorem', 5);
isPalindrom('lorem');
translateStringToNumbers('lore');
