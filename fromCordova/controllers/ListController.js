const mongoose = require('mongoose');
require('../models/List');
const List = mongoose.model('lists');

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

  singleUserList: (req, res) => {
    List.find({ id: req.params.id })
      .then((list) => {
        res.status(200).json(list);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },
};
