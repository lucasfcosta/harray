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
