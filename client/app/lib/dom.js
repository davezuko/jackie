var _slice = [].slice;

module.exports = exports = {};

exports.get = function (selector, dontExtend) {
  var nodes = toArray(document.querySelectorAll(selector));
  return dontExtend ? nodes : nodes.map(exports.extend);
};

exports.one = function (selector, dontExtend) {
  return exports.get(selector, dontExtend)[0];
};

exports.extend = function (node) {
  return new ExtendedNode(node);
};

function toArray (arrayLike) {
  return _slice.apply(arrayLike);
}

// -----------------------------------
function ExtendedNode (node) {
  this.node = node;
}

ExtendedNode.prototype.hasClass = function (className) {
  return this.node.className.split(' ').indexOf(className) !== -1;
};

ExtendedNode.prototype.addClass = function (className) {
  if (!this.hasClass(className)) {
    this.node.className = `${this.node.className} ${className}`;
  }
};

ExtendedNode.prototype.removeClass = function (className) {
  if (this.node.className.indexOf(className) !== -1) {
    this.node.className = this.node.className
      .split(' ')
      .filter(c => c !== className)
      .join(' ');
  }
};

ExtendedNode.prototype.toggleClass = function (className, state) {    
  if (typeof state !== 'undefined') {
    this[state ? 'addClass' : 'removeClass'](className);
  } else {
    this[!this.hasClass(className) ? 'addClass' : 'removeClass'](className);
  }
};
