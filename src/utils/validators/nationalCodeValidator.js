import { p2eDigits } from "utils/p2eDigits";

export function nationalCodeValidator(input) {
  if (!input) {
    return Promise.reject();
  }

  const eInput = p2eDigits(input);
  return new Promise((resolve, reject) => {
    let isValid = isNationalCodeValid(eInput);

    if (isValid) {
      resolve();
    } else {
      reject("کد ملی وارد شده صحیح نیست");
    }
  });
}

function isNationalCodeValid(input) {
  let isValid = true;
  // check length
  if (input.length !== 10) isValid = false;
  // input: '1234'
  const arrayValue = input.split(""); // ['1','2','3','4']
  function allEqual(arr) {
    return new Set(arr).size === 1;
  }
  //allEqual(['a', 'a', 'a', 'a']); // true
  //allEqual(['a', 'a', 'b', 'a']); // false
  if (allEqual(arrayValue)) isValid = false;

  const firstElement = +arrayValue.at(-1); // '4'
  const reversedArrayValue = arrayValue.reverse().splice(1); // ['4','3','2']
  let sum = 0;
  for (let index = 0; index < reversedArrayValue.length; index++) {
    const element = +reversedArrayValue[index];
    sum += element * (index + 2);
  }
  if (sum % 11 < 2) {
    if (sum % 11 !== firstElement) isValid = false;
  } else if (11 - (sum % 11) !== firstElement) isValid = false;

  return isValid;
}
