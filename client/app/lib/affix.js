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
};

const resolveLock = (bounds) => {
  if (bounds.get('top') > _cache.get('orig_top')) {
    setLockState(true);
  } else {
    setLockState(false);
  }
};

const setLockState = (locked) => {
  if (locked === _state.get('locked')) return;

  _$content.node.style.paddingTop = locked ? `${_cache.get('height')}px` : 0;
  _state.set('locked', locked);
  _$affixed.toggleClass('locked', locked);
};

// ------------------------------------
module.exports = init;
