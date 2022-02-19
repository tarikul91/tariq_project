const Attribute = require('../controller/attribute')
const router = require('express').Router();

router.post('/add', Attribute.addAttribute)
router.post('/edit-by-id/:id', Attribute.editById)
router.get('/get-by-id/:id', Attribute.getById)
router.get('/get-all', Attribute.getAll)
router.post('/delete-by-id/:id', Attribute.deleteById)
module.exports = router
