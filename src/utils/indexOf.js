/**
 * Returns the index of an element into the Harray.
 * @name Harray#indexOf
 * @method
 * @param {*} element - Any element in the Harray.
 * @returns {Number} The index of that element in the Harray
 * @example
 * let harr = new Harray(0, 5);
 *
 * harr.indexOf(5) // -> 1
 * harr.indexOf(20) // -> 5
 */
export function indexOf(element) {
    let index = 0;
    let lastFound = this.get(index);

    while (lastFound !== element) {
        index++;
        lastFound = this.get(index);
    }

    return index;
}
