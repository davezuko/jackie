const Events   = require('./event-emitter');
const Debounce = require('./debounce');

// ------------------------------------
// Cached properties
// ------------------------------------
let _window = new Map();

// -----------------------------------
// Cache Updaters
// -----------------------------------
const getWindowTop = (function (document) {
  return document.documentElement.scrollTop ?
    () => document.documentElement.scrollTop :
    () => document.body.scrollTop;
})(document);

const updateCache = () => {
  _window.set('height', window.innerHeight);
  _window.set('width', window.innerWidth);
  cacheVerticalDims();
};

const cacheVerticalDims = () => {
  _window.set('top', getWindowTop());
  _window.set('bottom', _window.get('top') + _window.get('height'));
};

// -----------------------------------
// Event Handlers
// -----------------------------------
const handleScroll = () => {
  cacheVerticalDims();
  Events.emit('window.scroll', _window);
};

const handleResize = () => {
  updateCache();
  Events.emit('window.resize', _window);
};

// load initial window dimensions into cache
updateCache();

// Only attach window listeners if a module has subscribed to them.
Events.onSubscription('window.scroll', function (event, eventName) {
  window.addEventListener('scroll', handleScroll);
}, true);

Events.onSubscription('window.resize', function (event, eventName) {
  window.addEventListener('resize', Debounce(handleResize, 250));
}, true);

// ------------------------------------
// Public API
// ------------------------------------
const _api = module.exports = exports = {};

_api.get = (prop) => prop ? _window.get(prop) : _window;
