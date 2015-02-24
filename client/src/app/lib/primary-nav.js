var ViewSpy = require('./view-spy'),
    Events  = require('./event-emitter');

// ------------------------------------
// DOM Cache
// ------------------------------------
var _dom   = {},
    _cache = {};

// ------------------------------------
function init () {
  _dom.nav = document.querySelector('.primary-nav');

  // initialize local DOM cache
  updateDOMCache(_dom.nav);

  // listen to window resize/scroll
  Events.on('window.scroll', resolveLock);
  Events.on('window.resize', function (data) {
    updateDOMCache(_dom.nav);
    resolveLock(data);
  });
};

function updateDOMCache (node) {
  _cache.height = node.offsetHeight;
  console.log('height = %s', _cache.height);
}

function resolveLock (bounds) {
  toggleClass(_dom.nav, 'locked', bounds.top >= _dom.nav.offsetTop);
  // console.log('resolving lock: ', bounds);
  // console.log('top offset:', _dom.nav.offsetTop);
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
module.exports = exports = {
  init : init
};
