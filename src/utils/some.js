export function some(fn, index) {
    index = typeof index === 'number' ? index : 0;

    if (typeof fn !== 'function') {
        throw new TypeError();
    }

    while (!fn(this.get(index))) {
        index++;
        some.call(this, fn, index);
    }
}
