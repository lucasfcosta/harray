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

        it('Formula accepts an index as argument to calculate the next result', () => {
            let h = new Harray(1, (element, index) => {
                return index + 2;
            });

            assert.strictEqual(h.get(0), 1);
            assert.strictEqual(h.get(1), 3);
            assert.strictEqual(h.get(3), 5);
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

    describe('Proxified Harray', () => {
        it('Should have directly acessible indexes if environment supports proxies', () => {
            if (Proxy !== undefined) {
                const h1 = new Harray(1, 99, 100);
                assert.strictEqual(h1[3], 101);

                const h2 = new Harray(1, 100, 99);
                assert.strictEqual(h2[3], 98);

                const h3 = new Harray(1, 100, 150, 155);
                assert.strictEqual(h3[4], 160);
            }
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

        it('Does not run the formula for user defined indexes', () => {
            let h = new Harray(3, 6);
            let formulaSpy = sandbox.spy(h, 'formula');
            h.set(2, 88);
            h.get(2);

            assert.isFalse(formulaSpy.called);
        });

        it('Returns the set value for user defined indexes', () => {
            let h = new Harray(3, 6);
            h.set(2, 88);

            assert.strictEqual(h.get(2), 88);
        });

        it('Is possible to set values for indexes using brackets notation', () => {
            let h = new Harray(3, 6);
            h[2] = 88;

            assert.strictEqual(h.get(2), 88);
        })
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

    describe('Harray Iterator', () => {
        it('Has an iterator function', () => {
            let h = new Harray();

            assert.typeOf(h[Symbol.iterator], 'function')
        });

        it('Can be iterated', () => {
            let harr = new Harray(0, 2);

            assert.doesNotThrow(() => {
                for (let h of harr) {
                    break;
                }
            }, TypeError);
        });

        it('Harray#getIterator returns a working iterator', () => {
            let h = new Harray(0, 2);
            let i = h.getIterator();

            assert.strictEqual(i.next().value, 0);
            assert.strictEqual(i.next().value, 2);
            assert.strictEqual(i.next().value, 4);
        });

        it('Done for Harray iterator is just false', () => {
            let h = new Harray(0, 2);
            let i = h.getIterator();

            assert.isFalse(i.next().done);
            assert.isFalse(i.next().done);
            assert.isFalse(i.next().done);
        });

        it('Iterator can be reseted if next receives true', () => {
            let h = new Harray(0, 2);
            let i = h.getIterator();

            assert.strictEqual(i.next().value, 0);
            assert.strictEqual(i.next().value, 2);
            assert.strictEqual(i.next(true).value, 0);
        });
    });
});
