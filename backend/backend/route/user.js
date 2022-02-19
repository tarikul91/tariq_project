const user = require('../controller/user')
const router = require('express').Router();
const auth = require('../middleware/user_auth')
const upload = require("../config/image-upload")

router.post('/signup',upload.single('picture'), user.signup)
router.post('/login', user.login)
router.get('/logout/:id', user.logout)
module.exports = router
