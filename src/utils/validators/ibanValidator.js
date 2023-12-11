export function ibanValidator(input) {
  const regex = /^(?:IR)(?=.{24}$)[0-9]*$/;

  return new Promise((resolve, reject) => {
    if (regex.test(input)) {
      resolve();
    } else {
      reject("شماره شبا وارد شده معتبر نیست");
    }
  });
}
