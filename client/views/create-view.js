'use strict';

function TodoCreateView(selector){
  this.view = $(selector);
  this.bind();
  this.attachEvents();
}

TodoCreateView.prototype.bind = function(){
  this.create = this.create.bind(this);
  this.reset = this.reset.bind(this);
};

TodoCreateView.prototype.attachEvents = function(){
  this.view.find('button').click(this.create);
};

TodoCreateView.prototype.reset = function(){
  this.view.find('input.description').val('');
  this.view.find('input.done').prop('checked', false);
};

TodoCreateView.prototype.create = function(){
  var self = this;
  App.todoModel.create({
    description: this.view.find('input.description').val(),
    done: this.view.find('input.done').prop('checked')
  }, function(){
    self.reset();
    App.todoListView.refresh();
  });
};