const mongoose = require('mongoose');
require('../models/Todo');
const Todo = mongoose.model('todos');

module.exports = {
  getAllTodos: (req, res) => {
    Todo.find({ user: req.params.id })
      .then((todos) => {
        res.status(200).json(todos);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },

  createNewTodo: (req, res) => {
    const listId = req.params.id;
    const { text, dueDate } = req.body;
    const newTodo = new Todo({
      text,
      complete: false,
      comments: [],
      dueDate,
      list: listId,
    });

    newTodo.save().then((todoResponse) => {
      res.status(201).json(todoResponse);
    });
  },

  updateTodoItem: (req, res) => {
    Todo.findById(req.params.id)
      .then((todo) => {
        console.log('BODY:: ', req.body);
        console.log('TODO BEFORE:: ', todo);
        todo.comments = [];
        todo.complete = !todo.complete;
        console.log('TODO:: ', todo);
        todo
          .save()
          .then((response) => {
            res.status(204).json(response);
          })
          .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(400).json(error));
  },
};
