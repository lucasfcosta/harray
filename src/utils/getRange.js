/**
 * Gets an aray with numbers from a start index until a final index (inclusively).
 * If the final index is smaller then the initial index the returned array will be in the reverse order (from start to end, as expected).
 * If only one argument is passed it will be used as the final index.
 * @name Harray#getRange
 * @method
 * @param {Number} [start] - The initial index. Defaults to 0.
 * @param {Number} [end] - The final index. Defaults to 0.
 * @returns rangeArray - An array of numbers from the initial index until the final index (inclusively).
 */
export function getRange(start, end) {
    start = typeof start === 'number' ? start : 0;
    end = typeof end === 'number' ? end : 0;

    if (arguments.length === 1) {
        end = start;
        start = 0;
    }

    let isReverse = false;
    if (start > end) {
        let tmp = start;
        start = end;
        end = tmp;
        isReverse = true;
    }

    let range = [];
    for (let i = start; i <= end; i++) {
        range.push(this.get(i));
    }

    return isReverse ? range.reverse() : range;
}
