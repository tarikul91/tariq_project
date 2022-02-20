const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
   userName:{
       type:String,
   },
   title:{
    type:String,
   },
   description:{
       type:String
   },
   date:{
       type:Date
   },
  
}, {
    timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;