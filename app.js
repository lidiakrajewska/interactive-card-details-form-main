const cardCvc = document.querySelector(".card__cvc");
const cardNumber = document.querySelector(".card__number");
const cardName = document.querySelector(".card__name");
const cardExp = document.querySelector(".card__exp");
const fullName = document.querySelector("#name");
const num = document.querySelector("#card-num");
const expMm = document.querySelector("#exp-date-mm");
const expYy = document.querySelector("#exp-date-yy");
const cvc = document.querySelector("#cvc");
const error = document.querySelector(".error");

const information = document.querySelector(".information");
const thankYou = document.querySelector(".thank-you");
const submitBtn = document.querySelector(".submit-btn");
const continueBtn = document.querySelector(".continue-btn");

const inputs = document.querySelectorAll("input");
const nameError = document.querySelector("#name-error");
const cardNumError = document.querySelector("#card-num-error");
const dateError = document.querySelector("#date-error");
const cvcError = document.querySelector("#cvc-error");

clearInputs();

// Updating info on the card image and fromatting input
fullName.addEventListener("input", () => {
  cardName.innerHTML = fullName.value;
});

num.addEventListener("input", () => {
  updateCardNum();
});
num.addEventListener("change", () => {
  num.value = num.value.replaceAll(" ", "");
  num.value = num.value.replace(/(.{4})/g, "$1 ");
  updateCardNum();
});
function updateCardNum() {
  cardNumber.innerHTML = num.value;
}

expMm.addEventListener("input", () => {
  updateDate();
});
expMm.addEventListener("change", () => {
  if (expMm.value.length == 1) {
    expMm.value = "0" + expMm.value;
  }
  updateDate();
});
expYy.addEventListener("input", () => {
  updateDate();
});
expYy.addEventListener("change", () => {
  if (expYy.value.length == 1) {
    expYy.value = "0" + expYy.value;
  }
  updateDate();
});

function updateDate() {
  if (expYy.value === "") {
    cardExp.innerHTML = expMm.value + "/00";
  } else if (expMm.value === "") {
    cardExp.innerHTML = "00/" + expYy.value;
  } else {
    cardExp.innerHTML = expMm.value + "/" + expYy.value;
  }
}

cvc.addEventListener("input", () => {
  cardCvc.innerHTML = cvc.value;
});

// Submitting the form
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let correct = true;
  // Checking if input info is correct and not missing
  // Name input
  if (fullName.value === "") {
    nameError.innerHTML = "Can't be blank";
    fullName.classList.add("error-input");
    correct = false;
  } else {
    nameError.innerHTML = "";
    fullName.classList.remove("error-input");
  }
  // Card number input
  if (num.value === "") {
    cardNumError.innerHTML = "Can't be blank";
    num.classList.add("error-input");
    correct = false;
  } else if (!Number.isInteger(parseInt(num.value))) {
    cardNumError.innerHTML = "Wrong format, numbers only";
    num.classList.add("error-input");
    correct = false;
  } else if (num.value.replaceAll(" ", "").length > 16) {
    cardNumError.innerHTML = "Wrong card number, too long";
    num.classList.add("error-input");
    correct = false;
  } else if (num.value.replaceAll(" ", "").length < 16) {
    cardNumError.innerHTML = "Wrong card number, too short";
    num.classList.add("error-input");
    correct = false;
  } else {
    cardNumError.innerHTML = "";
    num.classList.remove("error-input");
  }
  // Date input
  let dateCorrect;
  if (expMm.value === "") {
    dateError.innerHTML = "Can't be blank";
    expMm.classList.add("error-input");
    correct = false;
  } else if (
    !Number.isInteger(parseInt(expMm.value)) ||
    expMm.value < 1 ||
    expMm.value > 12
  ) {
    dateError.innerHTML = "Date incorrect";
    expMm.classList.add("error-input");
    correct = false;
  } else {
    dateError.innerHTML = "";
    expMm.classList.remove("error-input");
    dateCorrect = true;
  }
  if (expYy.value === "") {
    dateError.innerHTML = "Can't be blank";
    expYy.classList.add("error-input");
    correct = false;
  } else if (
    !Number.isInteger(parseInt(expYy.value)) ||
    expYy.value.length > 2
  ) {
    dateError.innerHTML = "Date incorrect (MM/YY)";
    expYy.classList.add("error-input");
    correct = false;
  } else {
    expYy.classList.remove("error-input");
    if (dateCorrect) {
      dateError.innerHTML = "";
    }
  }
  // CVC input
  if (cvc.value === "") {
    cvcError.innerHTML = "Can't be blank";
    cvc.classList.add("error-input");
    correct = false;
  } else if (!Number.isInteger(parseInt(cvc.value))) {
    cvcError.innerHTML = "Incorrect value, numbers only";
    cvc.classList.add("error-input");
    correct = false;
  } else if (cvc.value.length < 3) {
    cvcError.innerHTML = "Too short";
    cvc.classList.add("error-input");
    correct = false;
  } else if (cvc.value.length > 3) {
    cvcError.innerHTML = "Too long";
    cvc.classList.add("error-input");
    correct = false;
  } else {
    cvcError.innerHTML = "";
    cvc.classList.remove("error-input");
  }

  // Displaying thank you message
  if (correct) {
    information.classList.add("hidden");
    thankYou.classList.remove("hidden");
  }
});

// Allowing to enter another card info
continueBtn.addEventListener("click", () => {
  information.classList.remove("hidden");
  thankYou.classList.add("hidden");
  clearInputs();
});

// Clearing all inputs and setting values for a card mockup
function clearInputs() {
  inputs.forEach((input) => {
    input.value = "";
  });
  cardCvc.innerHTML = "000";
  cardNumber.innerHTML = "0000 0000 0000 0000";
  cardName.innerHTML = "Jane Appleseed";
  cardExp.innerHTML = "00/00";
}

// Checking the inputs
// fullName.addEventListener("input", () => {
//   if (fullName.value === "") {
//     nameError.innerHTML = "Can't be blank";
//     fullName.classList.add("error-input");
//   } else {
//     nameError.innerHTML = "";
//     fullName.classList.remove("error-input");
//   }
// });

// num.addEventListener("input", () => {
//   if (num.value === "") {
//     cardNumError.innerHTML = "Can't be blank";
//     num.classList.add("error-input");
//   } else if (!Number.isInteger(parseInt(num.value))) {
//     cardNumError.innerHTML = "Wrong format, numbers only";
//     num.classList.add("error-input");
//   } else if (num.value.length > 16) {
//     cardNumError.innerHTML = "Wrong card number, too long";
//     num.classList.add("error-input");
//   } else if (num.value.length < 16) {
//     cardNumError.innerHTML = "Wrong card number, too short";
//     num.classList.add("error-input");
//   } else {
//     cardNumError.innerHTML = "";
//     num.classList.remove("error-input");
//   }
// });

// expMm.addEventListener("input", () => {
//   if (expMm.value === "") {
//     dateError.innerHTML = "Can't be blank";
//     expMm.classList.add("error-input");
//   } else if (
//     !Number.isInteger(parseInt(expMm.value)) ||
//     expMm.value < 1 ||
//     expMm.value > 12
//   ) {
//     dateError.innerHTML = "Date incorrect";
//     expMm.classList.add("error-input");
//   } else {
//     dateError.innerHTML = "";
//     expMm.classList.remove("error-input");
//   }
// });

// expYy.addEventListener("input", () => {
//   if (expYy.value === "") {
//     dateError.innerHTML = "Can't be blank";
//     expYy.classList.add("error-input");
//   } else if (
//     !Number.isInteger(parseInt(expYy.value)) ||
//     expYy.value.length > 2
//   ) {
//     dateError.innerHTML = "Date incorrect (MM/YY)";
//     expYy.classList.add("error-input");
//   } else {
//     dateError.innerHTML = "";
//     expYy.classList.remove("error-input");
//   }
// });

// cvc.addEventListener("input", () => {
//   if (cvc.value === "") {
//     cvcError.innerHTML = "Can't be blank";
//     cvc.classList.add("error-input");
//   } else if (!Number.isInteger(parseInt(cvc.value))) {
//     cvcError.innerHTML = "Incorrect value, numbers only";
//     cvc.classList.add("error-input");
//   } else if (cvc.value.length < 3) {
//     cvcError.innerHTML = "Too short";
//     cvc.classList.add("error-input");
//   } else if (cvc.value.length > 3) {
//     cvcError.innerHTML = "Too long";
//     cvc.classList.add("error-input");
//   } else {
//     cvcError.innerHTML = "";
//     cvc.classList.remove("error-input");
//   }
// });
