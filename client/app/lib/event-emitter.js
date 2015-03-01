const _ = require('functional-js/es5');

// ------------------------------------
// Basic Pub/Sub System
// ------------------------------------
let _subscriptions = {};
let _api = module.exports = exports = {};

// basic unique ID generator.
const unique = (seed => () => seed++).call(undefined, 0);

_api.on = _api.subscribe = (event, callback, destroy) => {
  // create subscription object
  // TODO: make this a prototype?
  let subscription = {
    id    : unique(),
    event : event
  };

  subscription.off = () => _api.off(event, subscription.id);
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
  _api.emit('emitter.subscription');
  _api.emit(`emitter.subscription:${event}`);
  return subscription;
};

_api.emit = _api.publish = function (event, data) {
  if (_subscriptions[event]) {
    _subscriptions[event].forEach(s => s.callback(data || {}, s));
  }
};

_api.off = function (event, id) {
  let eventType = _subscriptions[event];
  if (eventType) {
    eventType = eventType.filter(s => s.id !== id);
  }
};

_api.onSubscription = (event, ...rest) =>
  _api.on(`emitter.subscription:${event}`, ...rest);
