'use strict';

const assert = require('chai').assert;
const Harray = require('../lib/harray');

describe('IndexOf Method', () => {
    it('Gets the index of an element', () => {
        let h = new Harray(0, 2);
        let hTimesTen = new Harray(1, function(element) {
            return element * 10;
        });

        assert.strictEqual(h.indexOf(6), 3);
        assert.strictEqual(h.indexOf(20), 10);
        assert.strictEqual(hTimesTen.indexOf(100000), 5);
        assert.strictEqual(hTimesTen.indexOf(1), 0);
    });
});
