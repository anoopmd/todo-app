'use strict';

function TodoListView(selector){
  this.list = $(selector);
  this.bind();
}

TodoListView.prototype.bind = function(){
  this.removeItem = this.removeItem.bind(this);
  this.refresh = this.refresh.bind(this);
};

TodoListView.prototype.populate = function(todo) {
  var self = this;
  App.todoModel.fetch(function(todos){
    if(todos.length){
      todos.forEach(function(todo){
        self.appendItemToList(todo);
      });
    }
  });
};

TodoListView.prototype.reset = function(){
  this.list.empty();
};

TodoListView.prototype.refresh = function(){
  this.reset();
  this.populate();
};

TodoListView.prototype.appendItemToList = function(todo) { 
  var template = "<tr><td>{{description}}</td><td>{{done}}</td>";
  template += "<td><button id='{{id}}' class='btn btn-sm btn-danger'>Delete</button></td>";
  var html = Mustache.render(template, {
    description: todo.description,
    done: todo.done ? 'Yes' : 'No',
    id: todo._id
  });
  this.list.append($(html));

  $('button#' + todo._id).click(this.removeItem);
};

TodoListView.prototype.removeItem = function(e){
  App.todoModel.remove(e.target.id, this.refresh);
};