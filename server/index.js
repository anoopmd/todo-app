var express = require('express');
var cors = require('cors');
var Datastore = require('nedb');
var bodyParser = require('body-parser');

// insert some data into db
var todo = new Datastore({
  filename: __dirname + '/../db/todo.db',
  autoload: true
});

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  return res.send('Express is up!');
});

app.get('/todo', function(req, res){
  todo.find({}, function(err, todos){
    if(err){
      return res.json({
        error : err
      });
    }

    return res.json(todos);
  });
});

app.get('/todo/:id', function(req, res){
  todo.find({_id:req.params.id}, function(err, todos){
    if(err){
      return res.json({
        error : err
      });
    }

    return res.json(todos[0]);
  });
});

app.post('/todo', function(req, res){
  if(req.body.done === "false"){
    req.body.done = false
  }

  if(req.body.done === "true"){
    req.body.done = true
  }

  todo.insert({
    description: req.body.description,
    done: req.body.done
  }, function(err, todos){
    if(err){
      return res.json({
        error : err
      });
    }

    return res.json(todos);
  });
});

app.put('/todo/:id', function(req, res){
  todo.update({
    _id: req.params.id
  }, {
    $set : {
      description: req.body.description,
      done: req.body.done
    }
  }, { 
    multi: true,
    returnUpdatedDocs : true
  }, function(err, numAffected, affectedDocuments){
    if(err){
      return res.json({
        error : err
      });
    }

    return res.json(affectedDocuments[0]);
  });
});

app.delete('/todo/:id', function(req, res){
  todo.remove({_id:req.params.id}, function(err, todos){
    if(err){
      return res.json({
        error : err
      });
    }

    return res.status(204).end();
  });
});


app.listen(3000,function(){
  console.log("I'm listneing on Port 3000");
});
