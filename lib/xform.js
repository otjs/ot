var _ = require('lodash');

var transform = exports.transform = function(a, b) {
  a = _.clone(a);
  b = _.clone(b);
  if (isNop(a) || isNop(b)) {
    return [a, b];
  }
  if (isAdd(a) && isAdd(b)) {
    if (a.line < b.line) {
      b.line += 1;
      return [a, b];
    }
    if (a.line > b.line) {
      a.line += 1;
      return [a, b];
    }
    if (a.content < b.content) {
      b.line += 1;
      return [a, b];
    }
    if (a.content > b.content) {
      a.line += 1;
      return [a, b];
    }
    return [null, null];
  }
  if (isAdd(a) && isDel(b)) {
    if (a.line <= b.line) {
      b.line += 1;
      return [a, b];
    }
    a.line -= 1;
    return [a, b];
  }
  if (isDel(a) && isAdd(b)) {
    if (a.line >= b.line) {
      a.line += 1;
      return [a, b];
    }
    b.line += 1;
    return [a, b];
  }
  if (isDel(a) && isDel(b)) {
    if (a.line < b.line) {
      b.line -= 1;
      return [a, b];
    }
    if (a.line > b.line) {
      a.line -= 1;
      return [a, b];
    }
    return [null, null];
  }
};

exports.transformBatch = function(client, server) {
  var transformedServer = _.clone(server, true);
  var transformedClient = _.map(client, function(action) {
    for (var i = 0; i < transformedServer.length; ++i) {
      var res = transform(action, transformedServer[i]);
      action = res[0];
      transformedServer[i] = res[1];
    }
    return action;
  });

  return [transformedServer, transformedClient];
};

function isAdd(v) {
  return v.type === 'add';
}

function isDel(v) {
  return v.type === 'del';
}

function isNop(v) {
  return v === null;
}
