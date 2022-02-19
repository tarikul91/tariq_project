const Post = require('../model/post')
const mongoose = require('mongoose')

module.exports.addPost = async (req, res, next) => {
    try {

        const {
            user_id,
            title,
            description,
        } = req.body
        if (!user_id || !title || !description) {
            return res.status(400).json({ msg: 'Please fill all the field', status: false })
        }
        const newPost =  Post.create({
            title,
            description,
            user:new mongoose.Types.ObjectId(user_id),
        })
        if(newPost != null){
            res.json({ msg: 'New post added', status: true })
        }
        else{
            res.status(400).json({ msg: 'Post could not be added.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}

module.exports.getById = async (req, res, next) => {
    try {

        const user_id = req.params.post_id
        if (!post_id ) {
            return res.status(400).json({ msg: 'Please provide post_id', status: false })
        }
        const post = await Post.findById(post_id)
        if(post != null){
            res.json({ msg: 'Post found', status: true, data:post })
        }
        else{
            res.status(400).json({ msg: 'Post could not be found.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.getByUserId = async (req, res, next) => {
    try {

        const user_id = req.params.user_id
        if (!user_id ) {
            return res.status(400).json({ msg: 'Please provide user_id', status: false })
        }
        const post = await Post.find({user:user_id})
        if(post != null){
            res.json({ msg: 'Post found', status: true, data:post })
        }
        else{
            res.status(400).json({ msg: 'Post could not be found.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}