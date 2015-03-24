// TODO:
// * container should be generated if not found
// * curry .notify()
// ------------------------------------
// Module Dependencies / Constants
// ------------------------------------
const $        = require('./dom');
const Template = require('./template');

const NOTIFICATION_ITEM = new Template([
  '<li class="notification {{ type }}">',
    '<i class="exit fa fa-times"></i>',
    '<span class="message">{{ message }}</span>',
  '</li>'
].join(''));

// ------------------------------------
// Initialize DOM
// ------------------------------------
const _$container = $.one('.notification-container');

// ------------------------------------
// Public API
// ------------------------------------
const _api = {};

_api.notify = function (message, type, delay) {
  displayNotification(buildNotification({
    message, type
  }), delay);
};

_api.info = function (message) {
  _api.notify(message, 'info', 3000);
};

_api.error = function (message) {
  _api.notify(message, 'error', 8000);
};

_api.success = function (message) {
  _api.notify(message, 'success', 3000);
};

// ------------------------------------
// Internal Functions
// ------------------------------------
function buildNotification (data) {
  let node = document.createElement('div');

  node.innerHTML = NOTIFICATION_ITEM.render(data);
  node = node.firstChild;

  node.style.opacity = 1;
  node.style.zIndex  = 999;
  node.addEventListener('click', handleManualClose);

  return node;
}

function handleManualClose (e) {
  this.removeEventListener('click', handleManualClose);

  if (e.target.className.indexOf('exit') !== -1) {
    fadeNotification(this);
  }
}

function displayNotification (notification, delay) {
  _$container.node.appendChild(notification);

  if (delay) {
    setTimeout(() => fadeNotification(notification), delay);
  }
}

function fadeNotification (notification, callback) {
  if (notification.style.opacity <= 0) {
    destroyNotification(notification);
    if (typeof callback === 'function') {
      callback();
    }
    return;
  }

  notification.style.opacity -= 0.05;
  setTimeout(() => fadeNotification(notification), 25);
}

function destroyNotification (notification) {
  notification.removeEventListener('click');
  
  try {
    _$container.node.removeChild(notification);
  } catch (e) {}
}

// ------------------------------------
// Exports
// ------------------------------------
module.exports = exports = _api;
