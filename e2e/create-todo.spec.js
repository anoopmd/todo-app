module.exports = {
  'Todo App Create Page' : function (browser) {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 2000)
      .setValue('input[name=description]', 'Read a new book')
      .waitForElementVisible('button[name=create]', 1000)
      
    var previousTodoCount;
    browser.count('table tbody tr', function (result) {
      previousTodoCount = result.value;
    });

    browser
      .click('button[name=create]')
      .pause(1000);

    browser.expect.element('table tbody tr:first-child > td:first-child').text.to.contain("Read a new book");
    browser.pause(2000);
    browser.perform(function(client, done){
      browser.assert.visibileElementsCount('table tbody tr', previousTodoCount + 1);
      done();
    });
    browser.end();
  }
};