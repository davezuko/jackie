const $ = require('../lib/dom');
const api = require('../lib/api');
let _form;

function init (form) {
  _form = form;

  _form.on('submit', function (e) {
    e.preventDefault();

    api.post('/contact', {
      firstName : _form.node.firstName.value,
      lastName  : _form.node.lastName.value,
      message   : _form.node.message.value
    });
  });
}


module.exports = function (formSelector) {
  let node = $.one(formSelector);

  if (node) {
    init(node);
  } else {
    console.warn('No contact form found.');
  }
};
