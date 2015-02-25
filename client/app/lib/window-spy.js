var Events   = require('./event-emitter'),
    Debounce = require('./debounce');

// ------------------------------------
// Cached properties
// ------------------------------------
var _window = {
  top    : undefined,
  right  : undefined,
  bottom : undefined,
  left   : 0,

  height : undefined,
  width  : undefined
};

// -----------------------------------
// Cache Updaters
// -----------------------------------
function updateCache () {
  _window.height = window.innerHeight;
  _window.width  = window.innerWidth;
  cacheVerticalDims();
}

function cacheVerticalDims () {
  _window.top    = getWindowTop();
  _window.bottom = _window.top + _window.height;
}

// -----------------------------------
// Event Handlers
// -----------------------------------
function handleScroll () {
  cacheVerticalDims();

  Events.emit('window.scroll', {
    top    : _window.top,
    bottom : _window.bottom
  });
}

function handleResize () {
  updateCache();
  Events.emit('window.resize', _window);
}

var getWindowTop = (function (document) {
  return document.documentElement.scrollTop
    ? () => document.documentElement.scrollTop
    : () => document.body.scrollTop;
})(document);


// load initial window dimensions into cache
// and attach event listeners
updateCache();
window.addEventListener('scroll', Debounce(handleScroll, 10));
window.addEventListener('resize', Debounce(handleResize, 250));
