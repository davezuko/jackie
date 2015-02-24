var Events = require('./event-emitter');

// ------------------------------------
// cached properties
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
  _window.top    = getWindowTop();
  _window.bottom = _window.top + _window.height;

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
updateCache();

// attach event listeners
// TODO: throttling...
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);
