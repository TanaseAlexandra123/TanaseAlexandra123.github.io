class ScientificCalculator {
    constructor() {
        this.currentInput = '';
        this.screenElement = document.querySelector('.screen');
        this.initialFontSize = parseFloat(getComputedStyle(this.screenElement).fontSize);
        this.buttons = document.querySelectorAll('.calculator-button');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonPress(button.textContent));
        });
    }

    handleButtonPress(value) {
    if (value === 'C') {
        this.clear();
    } else if (value === '←') {
        this.backspace();
    } else if (value === '=') {
        this.calculate();
    } else if (this.isNumber(value) || value === '.') {
        this.handleNumber(value);
    } else if (this.isOperator(value)) {
        this.handleOperator(value);
    } else if (this.isFunction(value)) {
        this.handleFunction(value);
    } else if (!this.currentInput.includes(value)) {
        this.currentInput += value;
    }

    this.updateScreen();
}
    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    isOperator(value) {
        return ['+', '-', '*', '/', '^'].includes(value);
    }

    isFunction(value) {
        return ['sin', 'cos', 'tan', 'log', 'ln', '√', 'π', 'e', '%'].includes(value);
    }

    handleNumber(value) {
        this.currentInput += value;
    }

    handleOperator(value) {
        this.currentInput += ` ${value} `;
    }

    
    handleFunction(value) {
        if (value === '√') {
            this.currentInput += `sqrt(`;
        } else if (value === 'π') {
            this.currentInput += Math.PI;
        } else if (value === 'e') {
            this.currentInput += Math.E;
        } else if (value === '%') {
            this.calculatePercentage();
        } else if (value === 'ln') {
            this.currentInput += Math.LN2; 
        } else {
            this.currentInput += `${value}(`;
        }
    }

    calculatePercentage() {
        try {
            this.currentInput = math.evaluate(this.currentInput) / 100;
        } catch (error) {
            this.currentInput = 'Error';
        }
    }

    calculate() {
        try {
            this.currentInput = math.evaluate(this.currentInput);
        } catch (error) {
            this.currentInput = 'Error';
        }
    }

    clear() {
        this.currentInput = '';
    }

    backspace() {
        this.currentInput = this.currentInput.slice(0, -1);
    }

    updateScreen() {
        if (this.currentInput === '') {
            this.screenElement.textContent = '0';
        } else {
            this.screenElement.textContent = this.currentInput;
        }
        this.screenElement.style.fontSize = this.initialFontSize + 'px';
    }
    
}

const calculator = new ScientificCalculator();
