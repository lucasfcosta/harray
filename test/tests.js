'use strict';

const assert = require('chai').assert;
const Harray = require('../lib/harray');

describe('Harray Creation', () => {
    it('Creates a Harray object given a lower limit', () => {
        let h = new Harray(1);
        assert.strictEqual(h.get(1), 2);
        assert.strictEqual(h.get(3), 4);
    });

    it('Creates a Harray object given two steps', () => {
        let h = new Harray(1, 4);
        assert.strictEqual(h.get(2), 7);

        h = new Harray(8, 6);
        assert.strictEqual(h.get(2), 4);
    });

    it('Creates a Harray object given a starting step and a formula', () => {
        let h = new Harray(1, (element) => { return element * 2 + 10 });
        assert.strictEqual(h.get(1), 12);
        assert.strictEqual(h.get(2), 34);
    });

    it('Uses last two arguments as steps if more than 2 arguments were provided', () => {
        let h = new Harray(1, 99, 100);
        assert.strictEqual(h.get(3), 101);

        h = new Harray(1, 100, 99);
        assert.strictEqual(h.get(3), 98);

        h = new Harray(1, 100, 150, 155);
        assert.strictEqual(h.get(4), 160);
    });
});
