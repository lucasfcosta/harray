'use strict';

const assert = require('chai').assert;
const Harray = require('../lib/harray');

describe('Every Method', () => {
    it('Iterates through elements of a Harray until the callback returns false', () => {
        let h = new Harray(0, 2);
        let expected = [0, 2, 4, 6, 8, 10];
        let actual = [];

        h.every(function(el) {
            if (el > 10) {
                return false;
            } else {
                actual.push(el);
            }
        });

        assert.sameMembers(expected, actual);
    });

    it('Throws a TypeError if the argument is not an array', () => {
        let h = new Harray(0, 2);
        assert.throws(() => {
            h.every('hue');
        }, TypeError);
    });
});
