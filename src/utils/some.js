/**
 * This method calls the callback function once for every element in the Harray until it returns a truthy value.
 * @name Harray#some
 * @method
 * @param {Function} fn - A callback function which will be called with the element as the only argument.
 * It should return a truthy value in order to stop the loop.
 * @param {Number} [index] - A starting index. Default is 0.
 * @throws {TypeError} Will throw a TypeError if no callback function was provided.
 */
export function some(fn, index) {
    index = typeof index === 'number' ? index : 0;

    if (typeof fn !== 'function') {
        throw new TypeError();
    }

    while (!fn(this.get(index))) {
        index++;
    }
}
