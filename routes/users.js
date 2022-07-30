const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.allUsers);
router.get('/:email', UserController.singleUser);

module.exports = router;
