var transform = require('..');
var expect = require('chai').expect;

describe('transform', function() {
  it('should transform correctly', function() {
    var res = transform.transformBatch([
      { type: 'del', line: 0 },
      { type: 'del', line: 0 },
      { type: 'del', line: 0 }
    ], [
      { type: 'add', line: 0, content: '0' },
      { type: 'add', line: 2, content: '2' },
      { type: 'add', line: 4, content: '4' }
    ]);

    expect(res).to.eql([
      [
        { type: 'del', line: 1 },
        { type: 'del', line: 2 },
        { type: 'del', line: 3 }
      ], [
        { type: 'add', line: 0, content: '0' },
        { type: 'add', line: 1, content: '2' },
        { type: 'add', line: 2, content: '4' }
      ]
    ]);
  });
});
