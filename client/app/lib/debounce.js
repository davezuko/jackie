module.exports = (fn, threshold) => {
  let debounce;

  return () => {
    if (debounce) return;
    debounce = setTimeout(() => {
      fn();
      debounce = false;
    }, threshold);
  };
};
