const express = require('express');
const router = express.Router();
const { getAllTodos, createNewTodo, updateTodoItem } = require('../controllers/TodoController');

router.get('/', getAllTodos);
router.post('/', createNewTodo);
router.put('/:id/update', updateTodoItem);

module.exports = router;
