/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }
  if (!size) {
    return string;
  }
  let arr = string.split('');
  let lastChar = null;
  let consequtive = 0;
  let returnString = '';
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    if (current !== lastChar) {
      returnString = returnString.concat(current);
      lastChar = current;
      consequtive = 1;
      continue;
    }
    if (consequtive < size) {
      returnString = returnString.concat(current);
      consequtive++;
    }
  }
  return returnString;
}
