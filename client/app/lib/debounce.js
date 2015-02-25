module.exports = (fn, threshold) => {
  var debounce;

  return () => {
    if (debounce) return;
    debounce = setTimeout(() => {
      fn();
      debounce = false;
    }, threshold);
  };
};
