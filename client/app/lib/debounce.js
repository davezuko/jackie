module.exports = (fn, threshold) => {
  var debounce;

  return (...args) => {
    if (debounce) return;
    debounce = setTimeout(() => {
      fn(...args);
      debounce = false;
    }, threshold);
  };
};
