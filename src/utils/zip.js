/**
 * Creates an object joining values from the Harray (which will be the keys) and values from the argument array (which will be the values).
 * @name Harray#zip
 * @method
 * @param {Array} arr - An array of values.
 * @returns {Object} An object whose keys come from the Harray and values come from the argument passed.
 * @example
 * let harr = new Harray(0, 2);
 * let fruits = ['apple', 'pear', 'banana', 'papaya'];
 * harr.zip(fruits) // -> {0: 'apple', 2: 'pear', 4: 'banana', 6: 'papaya'}
 */
export function zip(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new TypeError();
    }

    let zipped = [];
    for (let i = 0; i < arr.length; i++) {
        let current = {};
        current[this.get(i)] = arr[i];
        zipped.push(current);
    }

    return zipped;
}
