const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
   name:{
       type:String,
   },
   todoName:{
    type:String,
   },
   isComplete:{
       type:Boolean,
       default:false
   },
   when:{
       type:Date
   },
  
}, {
    timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;