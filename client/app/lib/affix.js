const _ = require('functional-js/es5');
const $ = require('./dom');
const Events    = require('./event-emitter');
const WindowLib = require('./window-spy');

// ------------------------------------
// Private Cache
// ------------------------------------
let _cache = new Map();
let _state = new Map();
let _$affixed;
let _$content;

// ------------------------------------
const init = (selector, content) => {
  _$affixed = $.one(selector);
  _$content = $.one(content || 'body');
  if (typeof _$affixed !== 'object') {
    throw new Error(`Could not find a node for selector ${selector}.`);
  } else if (typeof _$content !== 'object') {
    throw new Error(`Could not find a content node for selector ${content}.`);
  }

  // Cache original DOM position for the elem to be affixed.
  _cache.set('content_padding', _$content.node.style.paddingTop || 0);
  cacheDOM();

  // If the item to be affixed is already at the top of the page, set the
  // lock state to true and don't bind listener events.
  if (_cache.get('orig_bottom') <= _cache.get('height')) {
    return setLockState(true);
  }

  // Attach window events and set initial lock state
  resolveLock(WindowLib.get());
  Events.on('window.scroll', resolveLock);
  Events.on('window.resize', _.all(
    () => setLockState(false), cacheDOM, resolveLock
  ));
};

const cacheDOM = () => {
  _cache.set('height', _$affixed.node.offsetHeight);
  _cache.set('orig_top', _$affixed.node.offsetTop);
  _cache.set('orig_bottom', _$affixed.node.offsetTop + _cache.get('height'));
};

const resolveLock = (windowBounds) => {
  if (windowBounds.get('top') > _cache.get('orig_top')) {
    if (!_state.get('locked')) {
      setLockState(true);
    }
  } else if (_state.get('locked')) {
    setLockState(false);
  }
};

const setLockState = (locked) => {
  console.log('setting lock state: ', locked);
  _$content.node.style.paddingTop = _cache.get('content_padding') +
    (locked ? `${_cache.get('height')}` : 0) + 'px';

  _state.set('locked', locked);
  _$affixed.toggleClass('locked', locked);
};

// ------------------------------------
module.exports = init;
