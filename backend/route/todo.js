const Todo = require('../controller/todo')
const router = require('express').Router();

router.post('/add', Todo.add)
module.exports = router
