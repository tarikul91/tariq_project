const DynamicForm = require('../controller/dynamic_form')
const router = require('express').Router();

router.post('/add', DynamicForm.addFrom)
router.post('/edit-by-id/:id', DynamicForm.editById)
router.post('/add-attribute/:id', DynamicForm.addAttribute)
router.post('/delete-attribute/:id', DynamicForm.deleteAttribute)
router.get('/get-by-id/:id', DynamicForm.getById)
router.get('/get-all', DynamicForm.getAll)
router.post('/delete-by-id/:id', DynamicForm.deleteById)
module.exports = router
