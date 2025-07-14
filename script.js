let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";

let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        if (value === '=') {
            try {
                string = eval(string);
                input.value = string;
            } catch {
                input.value = "Error";
                string = "";
            }
        } else if (value === 'AC') {
            string = "";
            input.value = string;
        } else if (value === 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } else {
            string += value;
            input.value = string;
        }
    })




        // ✅ Add keyboard support
    document.addEventListener('keydown', function (event) {
      const allowedKeys = '0123456789+-*/.=EnterBackspace';
      const key = event.key;

      if (allowedKeys.includes(key)) {
        if (key === 'Enter') {
          calculate();
        } else if (key === 'Backspace') {
          display.value = display.value.slice(0, -1);
        } else if (key === '=') {
          calculate();
        } else {
          append(key);
        }
      }
    });
})




