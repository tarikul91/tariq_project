const Attribute = require('../model/attribute')
const mongoose = require('mongoose')
const Validation = require("../config/validation")
module.exports.addAttribute = async (req, res, next) => {
    try {

        const data = req.body
        if(!data){
            return res.status(400).json({ msg: 'Please provide necessary data', status: true,  })
        }
        const newAttribute = await Attribute.create( data )
        if (newAttribute != null) {
            return res.json({ msg: 'New attribute added', status: true, data: newAttribute })
        }
        else {
            res.status(400).json({ msg: 'New attribute could not be added.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}

module.exports.editById = async (req, res, next) => {
    try {

        const att_id = req.params.id
        if (!att_id) {
            return res.status(400).json({ msg: 'Please provide id', status: false })
        }
        const update = req.body
        if(!update){
            return res.status(400).json({ msg: 'Please provide necessary data', status: true,  })
        }
        const updateAttribute = await Attribute.findOneAndUpdate( id, update, {
            new: true
          } )
        if (updateAttribute != null) {
            return res.json({ msg: 'Attribute updated', status: true, data: updateAttribute })
        }
        else {
            return res.status(400).json({ msg: 'Attribute could not be updated.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.getById = async (req, res, next) => {
    try {

        const att_id = req.params.id
        if (!att_id) {
            return res.status(400).json({ msg: 'Please provide id', status: false })
        }
        const attr = await Attribute.findById(att_id)
        if (attr != null) {
            return res.json({ msg: 'Attribute  found', status: true, data: attr })
        }
        else {
            return res.status(400).json({ msg: 'Attribute could not be found.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.getAll = async (req, res, next) => {
    try {

        const attr = await Attribute.find({})
        if (attr != null) {
            return res.json({ msg: 'All Attributes found ', status: true, data: attr })
        }
        else {
            return res.status(400).json({ msg: 'All Attribute could not be found.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.deleteById = async (req, res, next) => {
    try {

        const att_id = req.params.id
        if (!att_id) {
            return res.status(400).json({ msg: 'Please provide id', status: false })
        }
        Attribute.findByIdAndDelete(att_id, (er,doc) => {
            if (!er) {
                return res.json({ msg: 'Attribute deleted', status: true, })
            }
            else {
                return res.status(400).json({ msg: 'Attribute could not be deleted.', status: false })
            }
        })
    }
    catch (error) {
        next(error)
    }
}