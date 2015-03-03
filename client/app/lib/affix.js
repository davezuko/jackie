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
  _cache.set('content_padding', _$content.node.style.paddingTop || 0);
  cacheDOM();

  // Attach window events
  Events.on('window.scroll', resolveLock);
  Events.on('window.resize', _.all(
    () => setLockState(false), cacheDOM, resolveLock
  ));
};

const cacheDOM = () => {
  _cache.set('height', _$affixed.node.offsetHeight);
  _cache.set('orig_top', _$affixed.node.offsetTop);
};

// TODO: more efficient checks (scroll direction even?) to limit
// lock state manipulation.
const resolveLock = (bounds) => {
  let viewIsBelow = bounds.get('top') > _cache.get('orig_top');

  if (!_state.get('locked') && viewIsBelow) {
    setLockState(true);
  } else if (!viewIsBelow) {
    setLockState(false);
  }
};

const setLockState = (locked) => {
  _$content.node.style.paddingTop = _cache.get('content_padding') +
    (locked ? `${_cache.get('height')}` : 0) + 'px';

  _state.set('locked', locked);
  _$affixed.toggleClass('locked', locked);
};

// ------------------------------------
module.exports = init;
