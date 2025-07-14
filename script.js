document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputBox');
    const buttons = document.querySelectorAll('button');
    let string = "";
    let lastCalculation = "";

    // Button click handler
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');
            handleInput(value);
        });
    });

    // Keyboard input handler
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        const key = e.key;

        // Map keyboard keys to calculator functions
        const keyMap = {
            'Enter': '=',
            'Escape': 'AC',
            'Backspace': 'DEL',
            '*': '*',
            '/': '/',
            '+': '+',
            '-': '-',
            '%': '%',
            '.': '.',
            '0': '0',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9'
        };

        if (key in keyMap) {
            handleInput(keyMap[key]);
        } else if (key === 'c' || key === 'C') {
            handleInput('AC');
        }
    });

    function handleInput(value) {
        if (value === '=') {
            calculate();
        } else if (value === 'AC') {
            string = "";
            input.value = "0";
        } else if (value === 'DEL') {
            string = string.slice(0, -1);
            input.value = string || "0";
        } else {
            // Prevent multiple decimal points in a number
            if (value === '.' && string.slice(-1) === '.') {
                return;
            }
            
            // Prevent operators at the start (except minus for negative numbers)
            if (['+', '*', '/', '%'].includes(value) && string === "") {
                return;
            }
            
            // Prevent multiple consecutive operators
            const lastChar = string.slice(-1);
            if (['+', '-', '*', '/', '%'].includes(lastChar) && 
                ['+', '-', '*', '/', '%'].includes(value)) {
                string = string.slice(0, -1);
            }
            
            string += value;
            input.value = string;
        }
    }

    function calculate() {
        try {
            if (string.trim() === "") return;
            
            // Replace × with * for eval
            const expression = string.replace(/×/g, '*').replace(/−/g, '-');
            
            // Use Function constructor instead of eval for better security
            const result = new Function('return ' + expression)();
            
            if (isNaN(result) throw new Error("Invalid calculation");
            
            lastCalculation = string + "=" + result;
            string = result.toString();
            input.value = string;
        } catch {
            input.value = "Error";
            setTimeout(() => {
                string = "";
                input.value = "0";
            }, 1000);
        }
    }
});
