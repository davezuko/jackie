// TODO... clean this up when I have time
// TODO: switch to promises
const api = {};

api.post = function (route, data, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', route);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      cb(undefined, xhr.responseText);
    } else {
      cb(xhr);
    }
  };
  xhr.send(JSON.stringify(data || {}));
};

module.exports = exports = api;
