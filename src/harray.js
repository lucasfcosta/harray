'use strict';

import { getRange } from './utils/getRange';
import { zip } from './utils/zip';
import { some } from './utils/some';
import { every } from './utils/every';
import { getReadableStream } from './utils/getReadableStream';

/**
 * @class Harray
 * @classdesc An infinite array.
 * @property {Infinity} length - Returns the length of the Harray. (TIP: It's infinite)
 * @param {...Number} element - Every number passed as argument before the formula will be used as an element.
 * @param {Function} formula - A formula which will be used to calculate the next element. If it does not exist
 * the difference between the last two elements will be used as increment value to generate the sequence.
 * If there's a single element and no formula was provided the sequence will be generated using 1 as increment.
 */
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

Harray.prototype.length = Infinity;

/**
 * Gets the value from an index.
 * @method
 * @name Harray#get
 * @param {Number} index - A value's index.
 * @returns value - The value of an index.
 */
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

/**
 * Adds a method to the Harray prototype.
 * @method
 * @name Harray.addMethod
 * @param {String} methodName - The name of the property which will hold the method.
 * @param {Function} method - The method which will be added to the prototype.
 */
Harray.addMethod = function addMethod(methodName, method) {
    Harray.prototype[methodName] = method;
};

Harray.addMethod('getRange', getRange);

Harray.addMethod('zip', zip);

Harray.addMethod('some', some);

Harray.addMethod('every', every);

Harray.addMethod('getReadableStream', getReadableStream);

module.exports = Harray;
