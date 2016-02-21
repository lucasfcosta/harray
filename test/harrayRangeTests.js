'use strict';

const assert = require('chai').assert;
const Harray = require('../lib/harray');

describe('GetRange Method', () => {
    it('Gets the correct numbers from the passed index', () => {
        let h = new Harray(0, 2);
        let expected = [6, 8, 10, 12, 14, 16, 18, 20];

        let hNeg = new Harray(0, -3);
        let expectedNegative = [-6, -9, -12, -15, -18];

        assert.strictEqual(JSON.stringify(h.getRange(3, 10)), JSON.stringify(expected));
        assert.strictEqual(JSON.stringify(hNeg.getRange(2, 6)), JSON.stringify(expectedNegative));
    });

    it('Gets first element if start and end are not numbers', () => {
        let h = new Harray(-1, 2);

        assert.strictEqual(JSON.stringify(h.getRange('not a', 'number')), JSON.stringify([-1]));
    });

    it('Gets range in reverse order if start is bigger than end', () => {
        let h = new Harray(0, 2);
        let expected = [6, 4, 2, 0];

        assert.strictEqual(JSON.stringify(h.getRange(3, 0)), JSON.stringify(expected));
    });

    it('Uses argument as the final index if called with a single argument', () => {
        let h = new Harray(0, 2);
        let expected = [0, 2, 4, 6];

        assert.strictEqual(JSON.stringify(h.getRange(3)), JSON.stringify(expected));
    });
});
