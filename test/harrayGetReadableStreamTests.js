'use strict';

const assert = require('chai').assert;
const Harray = require('../lib/harray');


describe('GetReadableStream Method', () => {
    it('Runs fine without any arguments', () => {
        let h = new Harray(0, 2).getReadableStream();

        let expectedTen = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];
        let firstTen = [];

        let received = 0;
        h.on('data', (chunk) => {
            firstTen.push(parseInt(chunk.toString()));
            received++;

            if (received >= 10) {
                h.pause();
                assert.sameMembers(expectedTen, firstTen);
            }
        });
    });

    it('Accepts an index to be used as a start point', () => {
        let h = new Harray(0, 2).getReadableStream(2);

        let expectedTen = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
        let firstTen = [];

        let received = 0;
        h.on('data', (chunk) => {
            firstTen.push(parseInt(chunk.toString()));
            received++;

            if (received >= 10) {
                h.pause();
                assert.sameMembers(expectedTen, firstTen);
            }
        });
    });
});
