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
