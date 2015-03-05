const $ = require('./dom');

let _$node;
let _$toggle;

// TODO: error handling
const init = (selector) => {
  _$node   = $.one(selector);
  _$toggle = $.one(`${selector}__toggle`);

  _$toggle.on('click', function () {
    _$node.toggleClass('active');
  });
};

module.exports = init;
