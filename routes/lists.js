const express = require('express');
const router = express.Router();
const { allUserLists, allListsAndTodos, createNewList, singleUserList } = require('../controllers/ListController');

router.get('/:id', allUserLists);
router.post('/', createNewList);
router.get('/:id/todos', allListsAndTodos);
router.get('/single/:id', singleUserList);

module.exports = router;
