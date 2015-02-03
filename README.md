# ot
A line-based operational transform algorithm

![Build Status](https://travis-ci.org/otjs/ot.svg?branch=master)
[![Dependency Status](https://david-dm.org/otjs/ot.svg)](https://david-dm.org/otjs/ot)

Install
-------

```shell
npm install otjs
```

Usage
-----

```javascript
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
```
