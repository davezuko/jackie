// Basic pub/sub system
var _subscriptions = {};

module.exports = exports = {};

exports.on = exports.subscribe = function (event, callback, destroy) {

  console.log('subscription to: ', event);
  // create subscription object
  // TODO: make this a prototype?
  var subscription = {
    id    : unique(),
    event : event
  };

  subscription.off = () => exports.off(event, subscription.id);
  subscription.callback = !destroy ?
    callback : (...args) => {
      callback(...args);
      subscription.off();
    };

  // push subscription
  if (!_subscriptions[event]) {
    _subscriptions[event] = [];
  }
  _subscriptions[event].push(subscription);

  // emit subscription event
  // TODO: emit() should automatically handle these child events
  exports.emit('emitter.subscription');
  exports.emit(`emitter.subscription:${event}`);
  return subscription;
};

exports.emit = exports.publish = function (event, data) {
  if (_subscriptions[event]) {
    _subscriptions[event].forEach(s => s.callback(data || {}, s));
  }
};

exports.off = function (event, id) {
  var eventType = _subscriptions[event];
  if (eventType) {
    eventType = eventType.filter(s => s.id !== id);
  }
};

exports.onSubscription = (event, ...rest) =>
  exports.on(`emitter.subscription:${event}`, ...rest);

var unique = (seed => () => seed++).call(undefined, 0);
