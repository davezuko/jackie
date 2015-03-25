/* jshint ignore:start */
'use strict';

const REQUIRED_FIELDS = [
  { field : 'firstName', friendly : 'First Name', length : 2 },
  { field : 'lastName',  friendly : 'Last Name',  length : 2 },
  { field : 'email',     friendly : 'Email',      length : 5 },
  { field : 'message',   friendly : 'Message',    length : 20 }
];

module.exports = function (data) {
  try {
    const errors = REQUIRED_FIELDS.reduce(function (memo, item) {
      if (typeof data[item.field] === 'undefined') {
        memo.push({
          field   : item.field,
          message : `${item.friendly} field is required.`
        });
      } else if (data[item.field].length < item.length ) {
        memo.push({
          field   : item.field,
          message : `${item.friendly} field doesn't meet required length (${item.length}).`
        });
      }
      return memo;
    }, []);

    return errors.length ? errors : [];
  } catch (e) {
    return [{ message : 'Validation Error.' }];
  }
};
/* jshint ignore:end */
