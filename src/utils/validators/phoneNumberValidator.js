import { p2eDigits } from "utils/p2eDigits";

export function phoneNumberValidator(input) {
  const eInput = p2eDigits(input);
  return new Promise((resolve, reject) => {
    if (eInput.startsWith("09") && input.length === 11) {
      resolve();
    } else {
      reject('شماره تلفن باید با "09" شروع شود و طول آن باید 11 رقم باشد');
    }
  });
}
