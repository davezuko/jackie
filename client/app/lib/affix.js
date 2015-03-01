const _ = require('functional-js/es5');
const $ = require('./dom');
const ViewSpy = require('./window-spy');
const Events  = require('./event-emitter');

// ------------------------------------
// Private Cache
// ------------------------------------
let _cache = new Map();
let _state = new Map();
let _$affixed;

// ------------------------------------
const init = (selector) => {
  _$affixed = $.one(selector);
  if (typeof _$affixed !== 'object') {
    throw new Error(`Could not find a DOM node for selector ${selector}.`);
  }

  // Initialize locked state and cache original DOM position
  _state.set('locked', false);
  cacheDOM();

  // Attach window events
  Events.on('window.scroll', resolveLock);
  Events.on('window.resize', _.all(cacheDOM, resolveLock));
};

const cacheDOM = () => {
  _cache.set('height', _$affixed.node.offsetHeight);
  _cache.set('orig_top', _$affixed.node.offsetTop);
  _cache.set('orig_bottom', _cache.get('top') + _cache.get('height'));
};

const resolveLock = (bounds) => {
  if (_state.get('locked')) {

  }
};

const setLockState = (state) => {
  _state.set('locked', state);
  _$affixed.toggleClass('locked', state);
  // window.scrollBy(0, state ? -_cache.height : _cache.height);
};

// ------------------------------------
module.exports = init;
