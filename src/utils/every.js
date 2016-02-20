export function every(fn, index) {
    index = typeof index === 'number' ? index : 0;

    if (typeof fn !== 'function') {
        throw new TypeError();
    }

    while (fn(this.get(index))) {
        index++;
        this.every(fn, index);
    }
}