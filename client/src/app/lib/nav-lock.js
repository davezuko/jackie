var ViewSpy = require('./window-spy'),
    Events  = require('./event-emitter');

// ------------------------------------
// Private Cache
// ------------------------------------
var _dom   = {},
    _cache = {},
    _state = { locked : false };

// ------------------------------------
function init (node) {
  if (typeof node === 'string') {
    _dom.nav = document.querySelector(node);
  } else if (typeof node === 'object') {
    _dom.nav = node;
  }

  if (typeof _dom.nav !== 'object') {
    throw new Error('Nav Locker must be initialized on a DOM node.');
  }

  // initialize local DOM cache
  updateDOMCache();

  // listen to window resize/scroll
  Events.on('window.scroll', resolveLock);
  Events.on('window.resize', function (data) {
    updateDOMCache();
    resolveLock(data);
  });
};

function updateDOMCache () {
  _cache.height = _dom.nav.offsetHeight;

  if (!_state.locked) {
    _cache.origPos = {
      top    : _dom.nav.offsetTop,
      bottom : _dom.nav.offsetTop + _cache.height
    };
  }
}

function resolveLock (bounds) {
  if (_state.disableLock) return;

  if (!_state.locked) {
    if (bounds.top >= _dom.nav.offsetTop) {
      _state.locked = true;
      addClass(_dom.nav, 'locked');

      // need to scroll body to account for fixed position
      window.scrollBy(0, -_cache.height);
      _state.disableLock = true;
      setTimeout(function () {
        _state.disableLock = false;
      }, 500);
    }
  } else {
    if (bounds.top <= _cache.origPos.top) {
      _state.locked = false;
      removeClass(_dom.nav, 'locked');
    }
  }
}

// -----------------------------------
// DOM helpers (todo: move to lib)
// -----------------------------------
function toggleClass (node, className, state) {
  state = typeof state !== 'undefined' ? state : true;

  if (state) {
    addClass(node, className);
  } else {
    removeClass(node, className);
  }
}

function addClass (node, className) {
  if (node.className.indexOf(className) === -1) {
    node.className = node.className + ' ' + className;
  }
}

function removeClass (node, className) {
  node.className = node.className
    .split(' ')
    .filter(c => c !== className)
    .join(' ');
}

// ------------------------------------
module.exports = (node) => init(node);
