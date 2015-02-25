var ViewSpy = require('./window-spy'),
    Events  = require('./event-emitter'),
    Dom     = require('./dom');

// ------------------------------------
// Private Cache
// ------------------------------------
var _dom    = {},
    _cache  = {},
    _events = [],
    _state  = { locked : false };

// ------------------------------------
// TODO
// * [ ] Should not rely on CSS to do locking/unlocking
// ---> note: but should still apply the class
// ------------------------------------
function init (node, config) {
  if (typeof node === 'string') {
    _dom.nav = Dom.one(node);
  } else if (typeof node === 'object') {
    _dom.nav = Dom.extend(node);
  }

  if (typeof _dom.nav !== 'object') {
    throw new Error('Nav Locker must be initialized on a DOM node.');
  }

  // initialize local DOM cache and run configuration
  updateDOMCache();
  if (typeof config === 'object') {
    configure(config);
  }

  // TODO: move returned API definition outside of init
  return {
    configure : configure
  };
}

function configure (config) {

  // TODO: should not have to clear events, only initialize listeners
  // if they don't already exist. This is quicker for now.
  _events.forEach(e => e.off());
  _events = [];

  // if lock toggle isn't disabled, bind event listeners
  if (config.toggle !== false) {
    console.log(config);
    _events.push(Events.on('window.scroll', resolveLock));
    _events.push(Events.on('window.resize', function (data) {
      updateDOMCache();
      resolveLock(data);
    }));
  }
  if (typeof config.locked === 'boolean') {
    setLockState(config.locked);
  }
}

function updateDOMCache () {
  _cache.height = _dom.nav.node.offsetHeight;

  if (!_state.locked) {
    _cache.origPos = {
      top    : _dom.nav.node.offsetTop,
      bottom : _dom.nav.node.offsetTop + _cache.height
    };
  }
}

function resolveLock (bounds) {
  if (!_state.locked && bounds.top >= _dom.nav.node.offsetTop) {
    setLockState(true);
  } else if (
    _state.locked &&
    bounds.top <= (_cache.origPos.top - _cache.height)
  ) {
    setLockState(false);
  }
}

// TODO: needs to handle changing nav size.
function setLockState (state) {
  _dom.nav.toggleClass('locked', state);
  _state.locked = state;
  window.scrollBy(0, state ? -_cache.height : _cache.height);
}

// ------------------------------------
module.exports = (node, config) => init(node, config);
