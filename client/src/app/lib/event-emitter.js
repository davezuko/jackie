// Basic pub/sub system
var _subscriptions = {};

module.exports = exports = {};

exports.on = function (event, callback) {
  var subscription = {
    id       : unique(),
    event    : event,
    callback : callback
  };
  subscription.off = () => exports.off(subscription);

  if (!_subscriptions[event]) {
    _subscriptions[event] = [];
  }
  _subscriptions[event].push(subscription);
  return subscription;
};

exports.emit = function (event, data) {
  if (_subscriptions[event]) {
    _subscriptions[event].forEach(s => s.callback(data || {}, s));
  }
};

exports.off = function (sub) {
  var eventType = _subscriptions[sub.event];
  if (eventType) {
    eventType = local.filter(s => s.id !== sub.id);
  }
};

var unique = (function (key) {
  return () => key++;
})(0);
