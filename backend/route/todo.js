const Todo = require('../controller/todo')
const router = require('express').Router();

router.post('/add', Todo.add)
router.get('/all', Todo.all)
module.exports = router
