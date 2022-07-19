const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');

module.exports = {
  allUsers: (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },

  singleUser: (req, res) => {
    User.findOne({ email: req.params.email })
      .then((user) => {
        console.log('USER:: ', user);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },
};
