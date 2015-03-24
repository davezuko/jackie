const Template = require('./template');

const _api = {};
const _container = document.querySelector('.notification-container');
const _notification = new Template([
  '<li class="notification {{ type }}">',
    '<i class="exit fa fa-times"></i>',
    '<span class="message">{{ message }}</span>',
  '</li>'
].join(''));

// create notification container
// const _body = document.querySelector('body');
// let _container = document.createElement('div');
// _container.innerHtml = [
//   '<ol class="notification-container">',
//   '</ol>'
// ];
// _container.style.zIndex = 999;
// _container.style.position = fixed;
// _body.app


_api.info = function (message) {
  const notification = buildNotification({ message, type : 'info' });
  insertNotification(notification, 3000);
};

_api.error = function (message) {
  const notification = buildNotification({ message, type : 'error' });
  insertNotification(notification, 10000);
};

_api.info = function (message) {
  const notification = buildNotification({ message, type : 'success' });
  insertNotification(notification, 3000);
};

function buildNotification (data) {
  const template = _notification.render(data);

  let node = document.createElement('div');
  node.innerHTML = _notification.render(data);
  return node.firstChild;
}

function insertNotification (node, delay) {
  node.style.opacity = 1;
  node.style.zIndex  = 999;

  _container.appendChild(node);

  window.node = node;
  if (delay) {

    setTimeout(function () {
      removeNotification(node);
    }, delay);
  }
}

function removeNotification (node, callback) {
  if (node.style.opacity > 0) {
    node.style.opacity -= .05;
    setTimeout(function () {
      removeNotification(node);
    }, 25);
  } else {
    _container.removeChild(node);
    if (typeof callback === 'function') {
      callback();
    }
  }
}

module.exports = exports = _api;
