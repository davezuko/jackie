// TODO... clean this up when I have time
const api = {};

api.post = function (route, data) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', route);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('SUCCESS', xhr.responseText);
    } else {
      console.log('ERROR');
      console.log(xhr);
    }
  };
  xhr.send(JSON.stringify(data || {}));
};

module.exports = exports = api;
