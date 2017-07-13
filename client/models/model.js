'use strict';

function TodoModel(){}

TodoModel.prototype.fetch = function(cb){
  $.get('http://localhost:3000/todo', function(data){
    cb(data);
  });
};

TodoModel.prototype.create = function(todo, cb){
  $.post({
    url: 'http://localhost:3000/todo',
    data: todo,
    success: function(result) {
      return cb(result);
    }
  });
};

TodoModel.prototype.remove = function(id, cb){
  $.ajax({
    url: 'http://localhost:3000/todo/' + id,
    type: 'DELETE',
    success: function(result) {
      return cb(result);
    }
  });
};
