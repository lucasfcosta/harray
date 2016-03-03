'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const Harray = require('../lib/harray');

let sandbox = sinon.sandbox.create();

describe('Harray Object', () => {
    describe('Harray Creation', () => {
        it('Creates a Harray object given a lower limit', () => {
            let h = new Harray(1);
            assert.strictEqual(h.get(1), 2);
            assert.strictEqual(h.get(3), 4);
        });

        it('Accepts an array of elements', () => {
            let h = new Harray([1, 4]);
            assert.strictEqual(h.get(1), 4);
            assert.strictEqual(h.get(2), 7);

            let hFormula = new Harray([2, 6], (element) => {
                return element * 2;
            });
            assert.strictEqual(hFormula.get(0), 2);
            assert.strictEqual(hFormula.get(1), 6);
            assert.strictEqual(hFormula.get(2), 12);
            assert.strictEqual(hFormula.get(3), 24);
        });

        it('Creates a Harray object given two steps', () => {
            let h = new Harray(1, 4);
            assert.strictEqual(h.get(2), 7);

            h = new Harray(8, 6);
            assert.strictEqual(h.get(2), 4);
        });

        it('Creates a Harray object given a starting step and a formula', () => {
            let h = new Harray(1, (element) => {
                return element * 2 + 10;
            });

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

    describe('Harray Cache Values', () => {
        afterEach(() => {
            sandbox.restore();
        });

        it('Gets cached values correctly for indexes that have been asked before', () => {
            let h = new Harray(10, 15);
            assert.strictEqual(h.get(5), 35);
            assert.strictEqual(h.get(5), 35);
        });

        it('Gets cached values for indexes that were calculated but not asked for specifically', () => {
            let h = new Harray(10, 15);
            h.get(5);
            assert.strictEqual(h.get(4), 30);

            h = new Harray(50, 40);
            h.get(3);
            assert.strictEqual(h.get(2), 30);
        });

        it('Does not run formula for a value which was asked before', () => {
            let h = new Harray(3, 6);
            let formulaSpy = sandbox.spy(h, 'formula');
            h.get(2);
            h.get(2);
            assert.isTrue(formulaSpy.calledOnce);
        });

        it('Does not run formula for any value that was already calculated', () => {
            let h = new Harray(3, 6);
            let formulaSpy = sandbox.spy(h, 'formula');
            h.get(3);
            h.get(2);

            // Should have been called twice because it gets called for indexes 2 and 3 only
            assert.isTrue(formulaSpy.calledTwice);
        });
    });

    describe('Length Property', () => {
        it('Always returns infinity', () => {
            let h = new Harray(1, 2);
            assert.strictEqual(h.length, Infinity);

            h = new Harray(10);
            assert.strictEqual(h.length, Infinity);
        });
    });

    describe('Harray Extensions', () => {
        it('Adds a method with a name and a function to the Harray prototype', () => {
            let batmanGet = sandbox.spy(function batmanGet(index) {
                return `Batman: ${this.get(index)}`;
            });

            Harray.addMethod('batmanGet', batmanGet);
            assert.isTrue('batmanGet' in Harray.prototype);

            let batHarray = new Harray(10, 60);
            assert.strictEqual(batHarray.batmanGet(3), 'Batman: 160');
        });
    });
});
