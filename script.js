// Math functions
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return b == 0 ? "ERROR" : a / b;
}

// Operator function
function operate(operand1, operator, operand2) {
  let result;
  switch (operator) {
    case "+":
      return add(operand1, operand2);
    case "-":
      return sub(operand1, operand2);
    case "*":
      return mul(operand1, operand2);
    case "/":
      return div(operand1, operand2);
  }
}

// DOM elements
let display = document.querySelector(".result");
let subdisp = document.querySelector(".sub-display");
const decButton = document.querySelector("#decimal");
const buttons = document.querySelectorAll(".number");
const operators = Array.from(document.querySelectorAll(".operator"));
const ac = document.querySelector("#ac");
const equals = document.querySelector("#equals");
const button = Array.from(buttons);

// Calculator state
let input = "";
let result;
let decimal = false;
let equal = 0;
let operand1 = "";
let operand2 = "";
let operator = "";

// Decimal button event listener
decButton.addEventListener("click", () => {
  if (decimal == false) {
    if (operand1 == "" && input == "") {
      input = "0.";
      display.textContent = input;
      decimal = true;
    } else {
      input = input + ".";
      display.textContent = input;
      decimal = true;
    }
  }
});

// Operator buttons event listener
operators.forEach((op) => {
  op.addEventListener("click", () => {
    if (operand1 != "" && input != "") {
      operand2 = input;
      result = operate(parseFloat(operand1), operator, parseFloat(operand2));
      subdisp.textContent = `${operand1} ${operator} ${operand2}`;
      operand1 = result;
      input = "";
      operator = "";
      operand2 = "";
      decimal = false;
      display.textContent = result;
    }
    if (operand1 === "") {
      operand1 = input;
    }
    equal = 0;
    input = "";
    operator = op.innerText;
    display.textContent = operand1 + "" + operator;
  });
});

// Clear function
function clearValues() {
  input = "";
  operand1 = "";
  operand2 = "";
  operator = "";
  display.textContent = "";
  subdisp.textContent = "";
  decimal = false;
  equal=0
}

// Equals function
function evaluate() {
  if (operand1 != "" && operator != "" && input != "") {
    operand2 = input;
    result = operate(parseFloat(operand1), operator, parseFloat(operand2));
    subdisp.textContent = `${operand1} ${operator} ${operand2}`;
    operand1 = result;
    input = "";
    operand2 = "";
    operator = "";
    decimal = false;
    display.textContent = result;
    equal=1;
  }
}

// Event listeners for AC and Equals buttons
ac.addEventListener("click", () => clearValues());
equals.addEventListener("click", () => {evaluate()});

// Number buttons event listener
button.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (equal === 1) {
      operand1 = "";
      display.textContent = input;
      equal = 0;
    }
    input = input + btn.innerText;
    display.textContent = input;
  });
});
