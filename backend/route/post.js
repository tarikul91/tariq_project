const post = require('../controller/post')
const router = require('express').Router();
const auth = require('../middleware/auth')
const upload = require("../config/image-upload")

router.post('/add', post.addPost)
router.get('/getById/:post_id', post.getById)
router.get('/getByUserId/:user_id', post.getByUserId)
module.exports = router
