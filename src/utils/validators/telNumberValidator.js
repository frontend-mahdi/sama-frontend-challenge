import { p2eDigits } from "utils/p2eDigits";

export function telNumberValidator(input) {
  const eInput = p2eDigits(input);
  const regex = /^0[0-9]{2,}[0-9]{7,}$/;

  return new Promise((resolve, reject) => {
    if (regex.test(eInput)) {
      resolve();
    } else {
      reject("شماره تلفن وارد شده معتبر نیست");
    }
  });
}
