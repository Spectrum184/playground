const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const temporary = $('#temporary');
const history = $('#history');
const result = $('#result');
const btnSwitch = $('#btn-switch');
const btnClean = $('#btn-clean');
const btnUndo = $('#btn-undo');
const btnOperators = $$('#btn-operator');
const btnNumbers = $$('#btn-number');
const btnDot = $('#btn-dot');
const btnEqual = $('#btn-equal');
const btnAns = $('#btn-ans');

const RESULT_LENGTH = 10;
const NUMBER_OF_DIGITS_ROUNDED = 2;
const ERROR = 'ERROR';
const OUT_OF_BOUND = 'TOO_LARGE';
const INFINITY = 'INFINITY';

const calculator = {
    isOpen: false,

    historyValue: '',
    resultValue: '0',
    temporaryValue: '',

    //render result
    render: function () {
        if (this.isOpen) {
            temporary.innerText = this.temporaryValue;
            result.innerText = this.resultValue;
            history.innerText = this.historyValue;
        } else {
            temporary.innerText = '';
            result.innerText = '';
            history.innerText = '';

            this.historyValue = '';
            this.temporaryValue = '';
            this.resultValue = '0';
            this.isCalculating = false;
        }
    },

    //bind event for button
    handleEvent: function () {
        const _this = this;

        //turn on-off calculator
        btnSwitch.onclick = function () {
            _this.isOpen = !_this.isOpen;
            _this.render();
        }

        //bind action for button number
        for (const btnNumber of btnNumbers) {
            btnNumber.onclick = function () {
                if (isNaN(_this.resultValue)) {
                    result.innerText = '';
                    _this.resultValue = '0';

                    _this.render();
                }

                if (_this.resultValue.length > RESULT_LENGTH) {
                    return;
                } else {
                    if (_this.resultValue === '0') {
                        _this.resultValue = _this.resultValue.replace(/^0+/, '') + this.innerText
                    } else {
                        _this.resultValue += this.innerText;
                    }

                    _this.temporaryValue += this.innerText;
                }

                _this.render();
            }
        }

        //bind action for button operator
        for (const btnOperator of btnOperators) {
            btnOperator.onclick = function () {
                if (_this.temporaryValue === '') return;

                if (isNaN(_this.temporaryValue[_this.temporaryValue.length - 1])) {
                    return;
                } else {
                    if (isNaN(_this.temporaryValue)) {
                        _this.getResult(eval(_this.temporaryValue))
                    } else {
                        _this.resultValue = '0'
                        _this.temporaryValue += this.innerText
                    }
                }

                _this.render();
            }
        }

        //bind action for result button
        btnEqual.onclick = function () {
            if (isNaN(_this.temporaryValue[_this.temporaryValue.length - 1])) {
                return;
            } else {
                const result = eval(_this.temporaryValue);
                _this.getResult(result);
                _this.render();
            }
        }

        //bind action for clear button
        btnClean.onclick = function () {
            _this.historyValue = '';
            _this.resultValue = '0';
            _this.temporaryValue = '';

            _this.render();
        }

        //bind action for undo button
        btnUndo.onclick = function () {
            _this.resultValue = '0';

            _this.render();
        }

        //bind action for show history button
        btnAns.onclick = function () {
            _this.resultValue = _this.historyValue ? _this.historyValue : '0';
            _this.temporaryValue = _this.historyValue;

            _this.render();
        }

        //bind action for dot button
        btnDot.onclick = function () {
            if (isNaN(_this.resultValue)) {
                return;
            }
        }
    },

    //show result on calculating
    getResult: function (result) {
        switch (result) {
            case Infinity:
                this.temporaryValue = '';
                this.resultValue = INFINITY;
                this.historyValue = '';
                break;

            case isNaN(result):
                this.temporaryValue = '';
                this.resultValue = ERROR;
                this.historyValue = '';
                break;

            case ((result % 1) !== 0):
                const resultTmp = parseFloat(result).toFixed(NUMBER_OF_DIGITS_ROUNDED);

                if (result.toString().length > RESULT_LENGTH) {
                    this.temporaryValue = '';
                    this.resultValue = OUT_OF_BOUND;
                    this.historyValue = '';
                } else {
                    this.temporaryValue = '';
                    this.resultValue = resultTmp.toString();
                    this.historyValue = resultTmp.toString();
                }

                break;

            default:
                if (result.toString().length > RESULT_LENGTH) {
                    this.temporaryValue = '';
                    this.resultValue = OUT_OF_BOUND;
                    this.historyValue = '';
                } else {
                    this.temporaryValue = '';
                    this.resultValue = '0';
                    this.historyValue = result.toString();
                }

                break;
        }
    },

    start: function () {
        this.handleEvent();
        this.render();
    }
}

calculator.start();