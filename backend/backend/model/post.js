const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
        required: [true, 'title is required'],
    },
   user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
   }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;