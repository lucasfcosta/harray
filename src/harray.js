'use strict';

function Harray() {
    let args = arguments;

    this.formula = function (el) {
        return el + 1;
    };

    let formulaExists = false;
    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === 'function') {
            this.formula = args[i];
            formulaExists = true;
            break;
        } else {
            this[i] = args[i];
        }
    }

    if (args.length >= 2 && !formulaExists) {
        this.formula = function (el) {
            return el + args[args.length - 1] - args[args.length - 2];
        };
    }
}

Harray.prototype.get = function get(index) {
    if (this[index] !== undefined) {
        return this[index];
    } else {
        let lastKey = Object.keys(this).length - 2;
        let result = this[lastKey];

        for (let i = lastKey; i < index; i++) {
            result = this.formula(result);
            this[i + 1] = result;
        }

        return this[index] = result;
    }
};

Harray.addMethod = function addMethod(methodName, method) {
    Harray.prototype[methodName] = method;
};

module.exports = Harray;
