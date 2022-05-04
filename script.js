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
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
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
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
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
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calculatedValue = calculate(firstValue, operator, secondValue);
        display.textContent = calculate(firstValue, operator, secondValue);
        calculator.dataset.firstValue = calculatedValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modifierValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      if (action !== "clear") {
        const clearButton = calculator.querySelector("[data-action=clear]");
        clearButton.textContent = "CE";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    // call calculate function upon hiting =
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculate.dataset.modifierValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modifierValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
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
