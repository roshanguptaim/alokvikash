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

// ✅ Handle keyboard input
document.addEventListener('keydown', function (event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    string += key;
    input.value = string;
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault(); // Prevent form submission if inside a form
    calculate();
  } else if (key === 'Backspace') {
    string = string.slice(0, -1);
    input.value = string;
  } else if (key.toUpperCase() === 'C') {
    string = "";
    input.value = "";
  }
});

// ✅ Safe eval wrapper
function calculate() {
  try {
    string = eval(string).toString();
    input.value = string;
  } catch {
    input.value = "Error";
    string = "";
  }
}
