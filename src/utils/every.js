/**
 * This method calls the callback function once for every element in the Harray until it returns a falsy value.
 * @name Harray#every
 * @method
 * @param {Function} fn - A callback function which will be called with the element as the only argument.
 * It should return a falsy value in order to stop the loop.
 * @param {Number} [index] - A starting index. Default is 0.
 * @throws {TypeError} Will throw a TypeError if no callback function was provided.
 * @example
 * let harr = new Harray(0, 2);
 * let evensUntilTen = [];
 * harr.every(function(element) {
 *      if (element >= 10) {
 *          return false;
 *      } else {
 *          evensUntilTen.push(element);
 *          return true;
 *      }
 * });
 *
 * console.log(evensUntilTen) // -> [0, 2, 4, 6, 8]
 */
export function every(fn, index) {
    index = typeof index === 'number' ? index : 0;

    if (typeof fn !== 'function') {
        throw new TypeError();
    }

    while (fn(this.get(index))) {
        index++;
    }
}
