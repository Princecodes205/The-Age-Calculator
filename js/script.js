"use strict";
const checkBtn = document.querySelector(".svg");
const calcBtn = document.querySelector(".calcb");
const resetBtn = document.querySelector(".reset");
const inputDay = document.querySelector(".day_input");
const inputMonth = document.querySelector(".month_input");
const inputYear = document.querySelector(".year_input");
const textError = document.querySelectorAll(".texterror");
const error = document.querySelectorAll(".errors");
const resultsValues = document.querySelectorAll(".val");
const inputs = [inputDay, inputMonth, inputYear];

const currentDate = new Date();
const day = currentDate.getDate();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const premonth = currentDate.getMonth();
const numberOfDaysInCurrentMonth = new Date(year, month, 0).getDate();
//Get number of days in previous month
const numberOfDaysInPreviousMonth = new Date(year, premonth, 0).getDate();

// validate errors
const checkErrors = function () {
  const checkDay = function () {
    if (inputDay.value > 31 || inputDay.value < 1) {
      error[0].textContent = "Must be a valid date";
      inputs[0].classList.add("inputerr");
      textError[0].style.color = " hsl(0, 100%, 67%)";
      resultsValues[2].textContent = "--";
    }
  };
  const checkMonth = function () {
    if (inputMonth.value > 12) {
      error[1].textContent = "Must be a valid Month";
      inputs[1].classList.add("inputerr");
      textError[1].style.color = " hsl(0, 100%, 67%)";
      resultsValues[1].textContent = "--";
    }
  };
  const checkYear = function () {
    if (inputYear.value > year) {
      error[2].textContent = "Must be a valid Year";
      inputs[2].classList.add("inputerr");
      textError[2].style.color = " hsl(0, 100%, 67%)";
    } else if (inputYear.value < 1899) {
      error[2].textContent = "Must be a valid Year";
      inputs[2].classList.add("inputerr");
      textError[2].style.color = " hsl(0, 100%, 67%)";
      resultsValues[0].textContent = "--";
      resultsValues[1].textContent = "--";
      resultsValues[2].textContent = "--";
    }
  };
  checkDay();
  checkMonth();
  checkYear();
};

// calculation algorithm
const calculations = function () {
  const calcYear = function () {
    const result = year - Number(inputYear.value);
    if (month < inputMonth.value) {
      resultsValues[0].textContent = result - 1;
    } else {
      resultsValues[0].textContent = result;
    }
  };
  const calcMonth = function () {
    if (day < inputDay.value) {
      resultsValues[1].textContent = month + 12 - Number(inputMonth.value) - 1;
    } else if (month < inputMonth.value) {
      resultsValues[1].textContent = month + 12 - Number(inputMonth.value);
    } else {
      resultsValues[1].textContent = month - Number(inputMonth.value);
    }
  };
  const calcDay = function () {
    if (day >= inputDay.value) {
      resultsValues[2].textContent = day - Number(inputDay.value);
    } else if (day < inputDay.value) {
      resultsValues[2].textContent =
        Number(numberOfDaysInPreviousMonth) + day - Number(inputDay.value);
    }
  };

  calcYear();
  calcMonth();
  calcDay();
};

/// implementing the algorithm
const wholeFunc = function () {
  const dontCalculate = function () {
    if (
      inputs[0].value === "" &&
      inputs[1].value === "" &&
      inputs[2].value === ""
    ) {
      return;
    } else if (
      inputs[0].value !== "" &&
      inputs[1].value !== "" &&
      inputs[2].value !== ""
    ) {
      resetBtn.addEventListener("click", function () {
        resultsValues[0].textContent = "--";
        resultsValues[1].textContent = "--";
        resultsValues[2].textContent = "--";
        inputs.forEach((el) => {
          el.value = "";
        });
        checkBtn.classList.remove("hidden");
      });
      calculations();
    }
  };

  inputs.forEach((inp, i) => {
    error.forEach((el, e) => {
      textError.forEach((te, t) => {
        if (inp.value === "" && e === i && t === e) {
          inp.classList.add("inputerr");
          el.textContent = "Field must not be empty ";
          te.style.color = " hsl(0, 100%, 67%)";
          te.style.margin = "0";
        } else if (inp.value !== "" && e === i) {
          inp.classList.remove("inputerr");
          el.textContent = "";
          te.classList.remove("texterr");
          te.style.color = " hsl(0, 0%, 86%)";
          te.style.margin = "0";
          checkErrors();
        }
      });
      dontCalculate();
    });
  });
};

resultsValues.forEach((el) => {
  el.classList.remove("animate");
});

inputs.forEach((el) => {
  el.addEventListener("click", function () {
    calcBtn.classList.remove("hidden");
  });
});

resetBtn.addEventListener("click", function () {
  const checkerrs = checkErrors();
  if (checkerrs) {
    return;
  }
  resetBtn.classList.add("hidden");
  calcBtn.classList.add("hidden");
  checkBtn.classList.remove("hidden");
});
calcBtn.addEventListener("click", function () {
  wholeFunc();
  const checkerr = checkErrors();

  if (!checkerr) {
    resetBtn.classList.add("hidden");
  }
  resetBtn.classList.remove("hidden");

  resultsValues[0].classList.add("animate");
  setTimeout(() => {
    resultsValues[0].classList.remove("animate");
  }, 2000);

  resultsValues.forEach((el) => {
    el.classList.add("animate");

    setTimeout(() => {
      el.classList.remove("animate");
    }, 1000);
  });
});

checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  wholeFunc();
});
