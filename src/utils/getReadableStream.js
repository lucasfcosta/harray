let Readable = require('stream').Readable;

/**
 * Returns a readable stream which outputs each one of the Harray elements.
 * @see {@link https://nodejs.org/api/stream.html| NodeJS Streams Documentation}
 * @name Harray#getReadableStream
 * @method
 * @param {Number} [startIndex] - The index to start from when outputting content. Defaults to 0.
 */

export function getReadableStream(startIndex) {
    let rs = Readable();

    let i = typeof startIndex === 'number' ? startIndex : 0;

    rs._read = () => {
        rs.push(new Buffer(`${this.get(i++)}`));
    };

    return rs;
}
