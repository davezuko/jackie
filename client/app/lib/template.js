function Template (template) {
  this._template = template;
}

Template.prototype.render = function (data) {
  return Object.keys(data).reduce((memo, prop) =>
    memo.split(`{{ ${prop} }}`).join(data[prop]), this._template);
};

module.exports = Template;
