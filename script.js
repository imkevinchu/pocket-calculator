const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return "number";
  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  )
    return "operator";
  // for everything else, return the action
  return action;
};

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  const { firstValue, operator, modifierValue, previousKeyType } = state;

  // display input number
  if (keyType === "number") {
    if (
      displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      return keyContent;
    } else {
      return displayedNum + keyContent;
    }
  }

  // append decimal
  if (keyType === "decimal") {
    if (!displayedNum.includes(".")) return displayedNum + ".";
    if (previousKeyType === "operator" || previousKeyType === "calculate")
      return "0.";
    return displayedNum;
  }

  // operator keys
  if (keyType === "operator") {
    return firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  // clear
  if (keyType === "clear") return 0;

  // equals
  if (keyType === "calculate") {
    return firstValue
      ? previousKeyType === "calculate"
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
};

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNum
) => {
  const keyType = getKeyType(key);
  const { firstValue, operator, modifierValue, previousKeyType } =
    calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === "operator") {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
        ? calculatedValue
        : displayedNum;
  }

  if (keyType === "calculate") {
    calculator.dataset.modifierValue =
      firstValue && previousKeyType === "calculate"
        ? modifierValue
        : displayedNum;
  }

  if (keyType === "clear" && key.textContent === "AC") {
    calculator.dataset.firstValue = "";
    calculator.dataset.modifierValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.previousKeyType = "";
  }
};

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key);
  Array.from(key.parentNode.children).forEach((k) =>
    k.classList.remove("is-depressed")
  );

  if (keyType === "operator") key.classList.add("is-depressed");

  if (keyType === "clear" && key.textContent !== "AC") {
    key.textContent = "AC";
  }

  if (keyType !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]");
    clearButton.textContent = "CE";
  }
};

keys.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  const key = e.target;
  const displayedNum = display.textContent;
  const resultString = createResultString(
    key,
    displayedNum,
    calculator.dataset
  );

  display.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
});

const calculate = (operand1, operator, operand2) => {
  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);

  if (operator === "add") {
    return operand1 + operand2;
  }

  if (operator === "subtract") {
    return operand1 - operand2;
  }

  if (operator === "multiply") {
    return operand1 * operand2;
  }

  if (operator === "divide") {
    return operand1 / operand2;
  }
};
