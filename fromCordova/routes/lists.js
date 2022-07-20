const express = require('express');
const router = express.Router();
const { allUserLists, allListsAndTodos, singleUserList } = require('../controllers/ListController');

router.get('/:id', allUserLists);
router.get('/:id/todos', allListsAndTodos);
router.get('/single/:id', singleUserList);

module.exports = router;
