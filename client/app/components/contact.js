const $      = require('../lib/dom');
const Api    = require('../lib/api');
const Notify = require('../lib/notification');
const ContactValidation = require('../isomorphic/contact-validation');

// ------------------------------------
// Module Definition
// ------------------------------------
const _state = new Map();
let _$form, _$submit;

function init () {
  _$form   = $.one('.contact-form');
  _$submit = $.one('.contact-submit');

  _$form.on('submit', e => {
    e.preventDefault();
    handleSubmit();
  });
  _$submit.on('click', handleSubmit);
}

function setSubmittingState (submitting) {
  _state.set('submitting', submitting);
  _$submit.toggleClass('submitting', submitting);
}

function handleSubmit () {

  // return early if a submission is already in progress
  // or a form has already been submitted
  if (_state.get('submitting')) {
    return;
  } else if (_state.get('submitted')) {
    Notify.error('You have already submitted a message!');
    return;
  }
  setSubmittingState(true);

  // validate form data
  const formData = {
    firstName : _$form.node.firstName.value,
    lastName  : _$form.node.lastName.value,
    email     : _$form.node.email.value,
    message   : _$form.node.message.value
  };
  const validationErrors = ContactValidation(formData);
  if (validationErrors.length) {
    validationErrors.forEach(err => Notify.error(err.message));
    setSubmittingState(false);
    return;
  }

  // Form is valid, submit to server
  Api.post('/contact', formData, (err, resp) => {
    if (err) {
      Notify.error('There was an error submitting your form.');
      console.error(err);
    } else {
      _state.set('submitted', true);
      Notify.success('Submission successful!');
      _$form.node.reset();
    }

    setSubmittingState(false);
  });
}

module.exports = init;
