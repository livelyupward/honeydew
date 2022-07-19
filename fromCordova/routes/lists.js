const express = require('express');
const router = express.Router();
const ListController = require('../controllers/ListController');

router.get('/', ListController.allUserLists);
router.get('/:id', ListController.singleUserList);

module.exports = router;
