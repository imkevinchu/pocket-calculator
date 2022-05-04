const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    // display input number or decimal
    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKey = "number";
    }

    // append decimal
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    // highlights operator key when pressed
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    if (action === "clear") {
      calculator.dataset.previousKeyType = "clear";
    }

    // call calculate function upon hiting =
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType;
    }
  }
});

const calculate = (operand1, operator, operand2) => {
  let result = "";
  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);

  if (operator === "add") {
    result = operand1 + operand2;
  } else if (operator === "subtract") {
    result = operand1 - operand2;
  } else if (operator === "multiply") {
    result = operand1 * operand2;
  } else if (operator === "divide") {
    result = operand1 / operand2;
  }

  return result;
};
