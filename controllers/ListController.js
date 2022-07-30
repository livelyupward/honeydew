const mongoose = require('mongoose');
require('../models/List');
require('../models/Todo');
const List = mongoose.model('lists');
const Todo = mongoose.model('todos');

module.exports = {
  allUserLists: (req, res) => {
    List.find({ user: req.params.id })
      .then((lists) => {
        res.status(200).json(lists);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },

  allListsAndTodos: async (req, res) => {
    List.find({ user: req.params.id })
      .then((lists) => {
        let todoQueries = [];

        lists.forEach((list) => {
          todoQueries.push(
            Todo.find({ list: list._id }).then((todos) => {
              return { list, todos };
            })
          );
        });

        return Promise.all(todoQueries);
      })
      .then((listOfJobs) => {
        res.json(listOfJobs);
      });
  },

  createNewList: (req, res) => {
    const { title, category, user } = req.body;

    const newList = new List({
      listTitle: title,
      category,
      user,
    });

    newList
      .save()
      .then((createListResponse) => {
        console.log('List created successfully.');
        res.status(201).json(createListResponse.data);
      })
      .catch((err) => res.status(500).json(err));
  },

  singleUserList: (req, res) => {
    List.findOne({ id: req.params.id })
      .then((list) => {
        res.status(200).json(list);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },
};
