export default function (...selectors) {
  for (const selector of selectors) {
    this[toCamelCase(selector)] = document.querySelector(selector);
  }
}

function toCamelCase(string) {
  let isUp = false;
  let newStr = '';
  for (const char of string) {
    if (char === '-') isUp = true;
    else if (char === '#' || char === '.' || char === '[' || char === ']') {
      newStr += '_';
    } else {
      newStr += isUp ? char.toUpperCase() : char;
      isUp = false;
    }
  }
  return newStr;
}
