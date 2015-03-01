'use strict';

const _ = require('functional-js/es5');
const _api = module.exports = exports = {};

// ------------------------------------
// Core API Methods
// ------------------------------------
_api.get = (selector, dontExtend) => {
  let nodes = [...document.querySelectorAll(selector)];
  return dontExtend ? nodes : _.map(_api.extend, nodes);
};

_api.one = _.compose(_.first, _api.get);

// -----------------------------------
// Node Wrapper
// -----------------------------------
_api.extend = (node) => new ExtendedNode(node);

const ExtendedNode = function (node) {
  this.node = node;
};

ExtendedNode.prototype.hasClass = (className) => {
  return this.node.className.split(' ').indexOf(className) !== -1;
};

ExtendedNode.prototype.addClass = (className) => {
  if (!this.hasClass(className)) {
    this.node.className = `${this.node.className} ${className}`;
  }
};

ExtendedNode.prototype.removeClass = (className) => {
  if (this.node.className.indexOf(className) !== -1) {
    this.node.className = _.pipe(
      _.split(' '),
      _.filter(c => !_.equals(className, c)),
      _.join(' ')
    )(className);
  }
};

ExtendedNode.prototype.toggleClass = (className, state) => {
  let method = 'addClass';

  if (
    (state === false) ||
    (_.is('undefined', state) && this.hasClass('state'))
  ) {
    method = 'removeClass';
  }

  this[method]();
};
