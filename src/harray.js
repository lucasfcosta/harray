'use strict';

import { getRange } from './utils/getRange';
import { zip } from './utils/zip';
import { some } from './utils/some';
import { every } from './utils/every';
import { getReadableStream } from './utils/getReadableStream';
import { indexOf } from './utils/indexOf';

/**
 * @class Harray
 * @classdesc An infinite array.
 * @property {Infinity} length - Returns the length of the Harray. (TIP: It's infinite)
 * @property {Array} cycle - If the harray uses a finite cycle to generate its elements, the cycle will be here, otherwise it will be undefined.<br>
 * Please see the [Harray.cycle() method]{@link Harray.cycle}.
 * @param {...Number | Array} element - Every number passed as argument before the formula will be used as an element. You can also pass an array as the first argument instead of multiple elements.
 * @param {Harray~formula} formula - A formula which will be used to calculate the next element.<br>
 * If it does not exist the difference between the last two elements will be used as increment value to generate the sequence.<br>
 * If there's a single element and no formula was provided the sequence will be generated using 1 as increment.
 * @example
 * let evensHarray = new Harray(0, 2);
 * evensHarray.get(2) // -> 4
 * evensHarray.get(5) // -> 10
 *
 * let oddsHarray = new Harray(1, 3);
 * oddsHarray.get(3) // -> 7
 * oddsHarray.get(4) // -> 9
 *
 * let binaryHarray = new Harray(1, function(element) {
 *      return element * 2;
 * };
 *
 * binaryHarray.get(1) // -> 2
 * binaryHarray.get(2) // -> 4
 * binaryHarray.get(3) // -> 8
 *
 * let nonUniformHarray = new Harray(1, 10, 22, 24);
 * nonUniformHarray.get(1) // -> 10
 * nonUniformHarray.get(3) // -> 24
 * nonUniformHarray.get(4) // -> 26
 * nonUniformHarray.get(5) // -> 28
 *
 * let oneItemHarray = new Harray(10);
 * oneItemHarray.get(0) // -> 10
 * oneItemHarray.get(1) // -> 11
 * oneItemHarray.get(2) // -> 12
 *
 * let oneItemHarray = new Harray([20, 30]);
 * oneItemHarray.get(0) // -> 20
 * oneItemHarray.get(1) // -> 30
 * oneItemHarray.get(2) // -> 40
 */
function Harray() {
    let args = arguments;

    if (Object.prototype.toString.call(arguments[0]) === '[object Array]') {
        args = arguments[0];
        if (typeof arguments[1] === 'function') {
            args.push(arguments[1]);
        }
    }

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
 * This is the formula that will be used to generate the next element in the sequence.
 * It receives the current element, does whatever you want with it and then returns the next element for the sequence.
 * @callback Harray~formula
 * @param {*} element - An element of the sequence.
 * @returns nextElement - The next element for the sequence.
 * @example
 * let timesTen = function(element) {
 *   return element * 10;
 * }
 *
 * let harr = new Harray(2, timesTen);
 * harr.get(0) // -> 2
 * harr.get(1) // -> 20
 * harr.get(2) // -> 200
 */

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
            result = this.formula(result, i + 1);
            this[i + 1] = result;
        }

        return this[index] = result;
    }
};

/**
 * Creates a Harray object which repeats the given cycle.
 * @method
 * @name Harray.cycle
 * @param {...*|Array} cycle - Arguments you want to use to create a cycle or an array of elements.
 * @returns Harray - A Harray object which repeats the given cycle.
 * @example
 * let cycle = Harray.cycle(1, 2, 3);
 *
 * cycle.get(2) // -> 3
 * cycle.get(3) // -> 1
 * cycle.get(4) // -> 2
 *
 * let anotherCycle = Harray.cycle([0, 1]);
 * anotherCycle.get(1) // -> 1
 * anotherCycle.get(2) // -> 0
 */
Harray.cycle = function cycle(cycleElements) {
    let h = new Harray();

    h.cycle = arguments.length > 1 ? Array.prototype.slice.call(arguments) : cycleElements;

    h.get = function(index) {
        if (this[index] !== undefined) {
            return this[index];
        } else {
            let result = this.cycle[index % this.cycle.length];
            this[index] = result;
            return result;
        }
    };

    return h;
};

/**
 * Adds a method to the Harray prototype.
 * @method
 * @name Harray.addMethod
 * @param {String} methodName - The name of the property which will hold the method.
 * @param {Function} method - The method which will be added to the prototype.
 * @example
 * let getDoubleFunction = function(index) {
 *      return this.get(i) * 2;
 * }
 *
 * Harray.addMethod('getDouble', getDoubleFunction);
 *
 * let harr = new Harray(1, 2);
 * harr.getDouble(0) // -> 2
 * harr.getDouble(1) // -> 4
 */
Harray.addMethod = function addMethod(methodName, method) {
    Harray.prototype[methodName] = method;
};

Harray.addMethod('getRange', getRange);

Harray.addMethod('zip', zip);

Harray.addMethod('some', some);

Harray.addMethod('every', every);

Harray.addMethod('getReadableStream', getReadableStream);

Harray.addMethod('indexOf', indexOf);

module.exports = Harray;
