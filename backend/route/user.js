const user = require('../controller/user')
const router = require('express').Router();
const auth = require('../middleware/auth')
const upload = require("../config/image-upload")

router.post('/signup',upload.single('picture'), user.signup)
router.post('/login', user.login)
router.post('/auth', user.auth)
router.get('/logout/:id', user.logout)
module.exports = router
