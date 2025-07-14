let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";

// ✅ Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let value = e.target.innerHTML;

    if (value === '=') {
      calculate();
    } else if (value === 'AC') {
      string = "";
      input.value = "";
    } else if (value === 'DEL') {
      string = string.slice(0, -1);
      input.value = string;
    } else {
      string += value;
      input.value = string;
    }
  });
});

// ✅ Handle keyboard input (Enter key fixed)
document.addEventListener('keydown', function (event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    string += key;
    input.value = string;
  } else if (key === 'Enter') {
    event.preventDefault(); // ✅ Prevent default form submission or newline
    calculate();
  } else if (key === 'Backspace') {
    string = string.slice(0, -1);
    input.value = string;
  } else if (key.toUpperCase() === 'C') {
    string = "";
    input.value = "";
  }
});

// ✅ Safe evaluation
function calculate() {
  try {
    if (string.trim() === "") return;
    string = eval(string).toString();
    input.value = string;
  } catch {
    input.value = "Error";
    string = "";
  }
}
