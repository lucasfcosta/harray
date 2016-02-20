let Readable = require('stream').Readable;

export function getReadableStream(startIndex) {
    let rs = Readable();

    let i = typeof startIndex === 'number' ? startIndex : 0;

    rs._read = () => {
        rs.push(new Buffer(`${this.get(i++)}`));
    };

    return rs;
}
