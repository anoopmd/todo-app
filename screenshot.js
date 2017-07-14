var system = require('system');
var url = system.args[1];
var filename = system.args[2];

var page = require('webpage').create();
page.open(url, function() {
  page.render('screenshots/' + filename);
  phantom.exit();
});