'use strict';

window.App = {};

$(document).ready(function(){
  App.todoModel = new TodoModel();
  App.todoListView = new TodoListView('table.todo-list tbody');
  App.todoCreateView = new TodoCreateView('.panel.todo-create');

  App.todoListView.populate();
});