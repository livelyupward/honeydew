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
    const { text, dueDate } = req.body;
    const newTodo = new Todo({
      text,
      complete: false,
      comments: [],
      dueDate,
    });

    newTodo.save().then((todoResponse) => {
      res.status(201).json(todoResponse);
    });
  },

  updateTodoItem: (req, res) => {
    console.log('test: ', req, res);
  },
};
