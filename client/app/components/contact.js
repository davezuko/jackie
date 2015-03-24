const $ = require('../lib/dom');
const api = require('../lib/api');
const Notify = require('../lib/notification');

let _submitting = false;
let _form;
let _submit;

const REQUIRED_FIELDS = [
  { field : 'firstName', length : 2 },
  { field : 'lastName', length : 2 },
  { field : 'email', length : 5 },
  { field : 'message', length : 20 }
];
const Submitted = false;

function init (form) {
  _form   = form;
  _submit = $.one('.contact-submit');

  window.submit = _submit;

  _form.on('submit', function (e) {
    e.preventDefault();

    handleSubmit();
  });

  _submit.on('click', function (e) {
    // e.preventDefault();

    handleSubmit();
  });
}

function handleSubmit () {
  if (_submitting) {
    return;
  }

  const validation = validateForm();

  if (validation !== true) {
    validation.forEach(err =>
      Notify.error(`${err.field} ${err.message}`));
    return;
  }

  setFormLock(true);
  api.post('/contact', {
    firstName : _form.node.firstName.value,
    lastName  : _form.node.lastName.value,
    email     : _form.node.email.value,
    message   : _form.node.message.value
  }, function (err, resp) {
    setFormLock(false);
    if (err) {
      Notify.error('There was an error submitting your form.');
      console.error(err);
    } else {
      Notify.info('Submission Successful!');
      console.log(resp);
    }
  });
}

function setFormLock (lock) {
  _submitting = lock;

  if (lock) {
    _submit.node.innerText = 'Submitting...';
  } else {
    _submit.node.innerText = 'Submit';
  }
}

function validateForm () {
  const validation = REQUIRED_FIELDS.reduce((memo, item) => {
    if (_form.node[item.field].value.length < item.length) {
      memo.push({
        field   : item.field,
        message : `doesn\'t meet required length (${item.length})`
      });
    }
    return memo;
  }, []);

  return validation.length ? validation : true;
}

module.exports = function (formSelector) {
  let node = $.one(formSelector);

  if (node) {
    init(node);
  } else {
    console.warn('No contact form found.');
  }
};
