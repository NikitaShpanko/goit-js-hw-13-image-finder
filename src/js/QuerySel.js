const DEFAULT_CONFIG = {
  '-': 'up',
  ' ': 'up',
  '#': '',
  '.': '',
  '[': '',
  ']': '',
  parent: document,
};

export default function (config, ...selectors) {
  if (typeof config === 'string') {
    selectors = [config, ...selectors];
    config = DEFAULT_CONFIG;
  } else {
    config = { ...DEFAULT_CONFIG, ...config };
  }
  for (const selector of selectors) {
    this[toCamelCase(selector, config)] = config.parent.querySelector(selector);
  }
}

function toCamelCase(string, config) {
  let isUp = false;
  let newStr = '';
  for (const char of string) {
    if (config.hasOwnProperty(char)) {
      if (config[char] === 'up') isUp = true;
      else newStr += config[char];
    } else newStr += isUp ? char.toUpperCase() : char;
  }
  return newStr;
}
