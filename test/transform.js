var transform = require('..');
var expect = require('chai').expect;

describe('transform', function() {
  it('should transform correctly', function() {
    var res = transform.transformBatch([
      { type: 'del', line: 0 },
      { type: 'del', line: 0 },
      { type: 'del', line: 0 }
    ], [
      { type: 'add', line: 0, text: '0' },
      { type: 'add', line: 2, text: '2' },
      { type: 'add', line: 4, text: '4' }
    ]);

    expect(res).to.eql([
      [
        { type: 'del', line: 1 },
        { type: 'del', line: 2 },
        { type: 'del', line: 3 }
      ], [
        { type: 'add', line: 0, text: '0' },
        { type: 'add', line: 1, text: '2' },
        { type: 'add', line: 2, text: '4' }
      ]
    ]);
  });

  it('should transform correctly 2', function() {
    var res = transform.transformBatch([{
      "type": "del",
      "line": 11
    }, {
      "type": "add",
      "line": 11,
      "text": "321312321312"
    }, {
      "type": "del",
      "line": 4
    }, {
      "type": "del",
      "line": 3
    }, {
      "type": "del",
      "line": 2
    }, {
      "type": "add",
      "line": 2,
      "text": "32312"
    }, {
      "type": "add",
      "line": 3,
      "text": "13321213"
    }], [{
      "type": "del",
      "line": 11
    }, {
      "type": "add",
      "line": 11,
      "text": "32131232112"
    }, {
      "type": "del",
      "line": 8
    }, {
      "type": "add",
      "line": 8,
      "text": "1231223"
    }, {
      "type": "del",
      "line": 3
    }, {
      "type": "del",
      "line": 2
    }, {
      "type": "add",
      "line": 2,
      "text": "3221313"
    }
    ]);

    expect(res).to.eql([
      [
        null,
        { type: 'add', line: 11, text: '321312321312' },
        { type: 'del', line: 3 },
        null,
        null,
        { type: 'add', line: 3, text: '32312' },
        { type: 'add', line: 4, text: '13321213' }
      ], [
        null,
        { type: 'add', line: 10, text: '32131232112' },
        { type: 'del', line: 7 },
        { type: 'add', line: 7, text: '1231223' },
        null,
        null,
        { type: 'add', line: 2, text: '3221313' }
      ]
    ]);
  });
});
