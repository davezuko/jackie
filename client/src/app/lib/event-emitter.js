// Basic pub/sub system
var _subscriptions = {};

module.exports = exports = {};

exports.on = function (event, callback) {
  var subscription = {
    id       : unique(),
    event    : event,
    callback : callback
  };
  console.log(subscription.id);
  subscription.off = () => exports.off(subscription);

  _subscriptions[event] = (
    _subscriptions[event] || []
  ).concat(subscription);
  return subscription;
};

exports.emit = function (event, data) {
  if (_subscriptions[event]) {
    _subscriptions[event].forEach(s => s.callback(data || {}, s));
  }
};

exports.off = function (sub) {
  var local = _subscriptions[sub.event];
  if (local) local = local.filter(s => s.id !== sub.id);
};

var unique = (key => key++)(0)
// var unique = (function (key) {
//   return () => key++;
// })(0);
