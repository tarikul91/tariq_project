const Todo = require('../model/todo')
const mongoose = require('mongoose')
module.exports.add = async (req, res, next) => {
    try {

        const data = req.body
        if(!data){
            return res.status(400).json({ msg: 'Please provide necessary data', status: true,  })
        }
        const newTodo = await Todo.create( data )
        if (newTodo != null) {
            return res.json({ msg: 'New attribute added', status: true, data: newTodo })
        }
        else {
            res.status(400).json({ msg: 'New attribute could not be added.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.all = async (req, res, next) => {
    try {

      
        const allData = await Todo.find({})
        if (allData != null) {
            return res.json({ msg: 'New attribute added', status: true, data: allData })
        }
        else {
            res.status(400).json({ msg: 'New attribute could not be added.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}

