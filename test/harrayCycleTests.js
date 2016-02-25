'use strict';

const assert = require('chai').assert;
const Harray = require('../lib/harray');

describe('Cycle Harray Creation', () => {
    it('Creates a Harray with a cycle', () => {
        let h = Harray.cycle([1, 2, 3]);

        assert.strictEqual(h.get(2), 3);
        assert.strictEqual(h.get(3), 1);
        assert.strictEqual(h.get(4), 2);
        assert.strictEqual(h.get(6), 1);
    });

    it('Has cycleElements inside a cycle attribute', () => {
        let h = Harray.cycle([1, 2, 3]);
        let harr = Harray.cycle([20, 30, 40]);

        assert.strictEqual(JSON.stringify(h.cycle), JSON.stringify([1, 2, 3]));
        assert.strictEqual(JSON.stringify(harr.cycle), JSON.stringify([20, 30, 40]));
    });

    it('Stores calculated values', () => {
        let h = Harray.cycle([1, 2, 3]);
        h.get(3);

        assert.strictEqual(h[3], 1);
        assert.strictEqual(h.get(3), 1);
    });
});
