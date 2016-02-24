'use strict';

const assert = require('chai').assert;
const Harray = require('../lib/harray');

describe('Zip Method', () => {
    it('Zips an infinite array and a common array', () => {
        let h = new Harray(0, 2);
        let fruits = ['apple', 'banana', 'pineapple'];
        let zipped = h.zip(fruits);

        assert.deepEqual(zipped[0], 'apple')
        assert.deepEqual(zipped[2], 'banana');
        assert.deepEqual(zipped[4], 'pineapple');
    });

    it('Throws a TypeError if the argument is not an array', () => {
        let h = new Harray(0, 2);
        assert.throws(() => {
            h.zip('hue');
        }, TypeError);
    });
});
