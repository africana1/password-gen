//* CharCode - http://www.net-comber.com/charset.html

//* Generator functions

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbol = '~!@#$%^&*(){}[]=<>/:;|"?';
  // return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
  return symbol[Math.floor(Math.random() * symbol.length)];
}

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//console.log(randomFunction.number());

//* DOM elements
function elementId(id) {
  return document.getElementById(id);
}

const resultElement = elementId('result');
const lengthElement = elementId('length');
const lowercaseElement = elementId('lowercase');
const uppercaseElement = elementId('uppercase');
const numbersElement = elementId('numbers');
const symbolsElement = elementId('symbols');
const generateElement = elementId('generate');
const clipboardElement = elementId('clipboard');

const toggleCheck = elementId('toggleCheck');
const toggleUnCheck = elementId('toggleUnCheck');
const clearPassword = elementId('clearPassword');

function checkedAll(isChecked) {
  let elements = document.querySelectorAll('input[type="checkbox"]');
  elements.forEach((element) => {
    element.checked = isChecked;
  });
}

toggleCheck.addEventListener('click', () => {
  checkedAll(true);
});

toggleUnCheck.addEventListener('click', () => {
  checkedAll(false);
});

//* generate event listening
generate.addEventListener('click', () => {
  //const length = parseInt(lengthElement.value);
  const length = +lengthElement.value;
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;

  resultElement.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//* generate password function
function generatePassword(lower, upper, number, symbol, length) {
  //* 1. Init password variable
  //* 2.Filter out unchecked types
  //* 3.Loop over length call generator function for each type
  //* 4.Add final password to the password variable and return

  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol; //returns 4 if all checked
  //console.log('TypeCount: ', typesCount);

  const typesArray = [{lower}, {upper}, {number}, {symbol}].filter((item) => Object.values(item)[0]);
  //console.log('TypesArray: ', typesArray);

  //* checking typesCount
  if (typesCount == 0) {
    return '==No Password==';
  }

  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * typesArray.length);
    generatedPassword += randomFunction[Object.keys(typesArray[random])[0]]();
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunction[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

//* copy password to clipboard
clipboardElement.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultElement.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  //alert('Password copied to clipboard');
  Swal.fire('Copied', '', 'success');
});

//* clear generated password

clearPassword.addEventListener('click', () => {
  resultElement.innerHTML = '';
});
