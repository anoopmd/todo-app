module.exports = {
  'Todo App Delete Action' : function (browser) {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 2000)
      
    var previousTodoCount;
    browser.count('table tbody tr', function (result) {
      previousTodoCount = result.value;
    });

    browser
      .click('table tbody tr:first-child  button')
      .pause(1000);

    browser.pause(2000);
    browser.perform(function(client, done){
      browser.assert.visibileElementsCount('table tbody tr', previousTodoCount - 1);
      done();
    });
    browser.end();
  }
};