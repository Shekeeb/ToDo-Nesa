const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/controller');

router.get('/', getTodos);
router.post('/create', createTodo);
router.put('/edit/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);

module.exports = router;