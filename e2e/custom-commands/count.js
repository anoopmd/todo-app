module.exports.command = function(selector, callback) {
  var self = this;

  this.execute(function(selector) {
    return document.querySelectorAll(selector).length
  }, [selector], function(result) {
    callback.call(self, result);
  });

  return this;
};