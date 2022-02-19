const DynamicForm = require('../model/dynamic_form')
const mongoose = require('mongoose')

module.exports.addFrom = async (req, res, next) => {
    try {

        const data = req.body
        if (!data.attributes) {
            return res.status(400).json({ msg: 'Please provide necessary data', status: true, })
        }
        if (!data.attributes.length) {
            return res.status(400).json({ msg: 'Attribute must be at least one.', status: true, })
        }
        const newForm = await DynamicForm.create(data)
        if (newForm != null) {
            return res.json({ msg: 'New Form added', status: true, data: newForm })
        }
        else {
            res.status(400).json({ msg: 'New From could not be added.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.getById = async (req, res, next) => {
    try {

        const form_id = req.params.id
        if (!form_id) {
            return res.status(400).json({ msg: 'Please provide id', status: false })
        }
        const dynamicForm = await DynamicForm.aggregate(
            [
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(form_id),
                    }
                },
                { $unwind: "$attributes" },
                {
                    $lookup:
                    {
                        from: 'attributes',
                        let: { attId: "$attributes.attribute", pos: "$attributes.position" },
                        pipeline: [
                            {
                                $match: {
                                    $and: [
                                        {
                                            $expr: {
                                                $eq: ["$$attId", "$_id"]
                                            }
                                        }
                                    ]
                                },

                            }, {

                                $addFields: {
                                    position: "$$pos"
                                }
                            }

                        ],
                        as: "attribute_details",
                    },
                },
                {$unwind:"$attribute_details"},
                { $project: { attributes: 0,  } },
                {
                    $group:{
                        _id:"$_id",
                        formDetail:{$first:"$$ROOT"},
                        all_attribute_details:{$push:"$attribute_details"}
                    }
                }
            ]
        )
        if (dynamicForm != null) {
            return res.json({ msg: 'Form  found', status: true, data: dynamicForm })
        }
        else {
            return res.status(400).json({ msg: 'Form could not be found.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.editById = async (req, res, next) => {
    try {

        const form_id = req.params.id
        if (!form_id) {
            return res.status(400).json({ msg: 'Please provide id', status: false })
        }
        const update = req.body
        if (!update) {
            return res.status(400).json({ msg: 'Please provide necessary data', status: true, })
        }
        if (!update.attributes.length) {
            return res.status(400).json({ msg: 'Attribute must be at least one.', status: true, })
        }
        const updateFrom = await DynamicForm.findOneAndUpdate(id, update, {
            new: true
        })
        if (updateFrom != null) {
            return res.json({ msg: 'Form updated', status: true, data: updateFrom })
        }
        else {
            return res.status(400).json({ msg: 'Form could not be updated.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.addAttribute = async (req, res, next) => {
    try {
        const form_id = req.params.id
        if (!form_id) {
            return res.status(400).json({ msg: 'Please provide id', status: false })
        }
        const {
            attribute,
            position
        } = req.body
        if (!attribute && !position) {
            return res.status(400).json({ msg: 'Please provide necessary data', status: true, })
        }
        const update = {
            $push: {
                attributes: {
                    attribute,
                    position
                }
            }
        }
        const updateFrom = await DynamicForm.findOneAndUpdate(id, update, {
            new: true
        })
        if (updateFrom != null) {
            return res.json({ msg: 'Form updated', status: true, data: updateFrom })
        }
        else {
            return res.status(400).json({ msg: 'Form could not be updated.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.deleteAttribute = async (req, res, next) => {
    try {
        const form_id = req.params.id
        if (!form_id) {
            return res.status(400).json({ msg: 'Please provide id', status: false })
        }
        const {
            attribute,
            position
        } = req.body
        if (!attribute && !position) {
            return res.status(400).json({ msg: 'Please provide necessary data', status: true, })
        }
        const update = {
            $pull: {
                attributes: {
                    attribute,
                    position
                }
            }
        }
        const updateFrom = await DynamicForm.findOneAndUpdate(id, update, {
            new: true
        })
        if (updateFrom != null) {
            return res.json({ msg: 'Form updated', status: true, data: updateFrom })
        }
        else {
            return res.status(400).json({ msg: 'Form could not be updated.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {

        const dynamicForm = await DynamicForm.aggregate(
            [
                { $unwind: "$attributes" },
                {
                    $lookup:
                    {
                        from: 'attributes',
                        let: { attId: "$attributes.attribute", pos: "$attributes.position" },
                        pipeline: [
                            {
                                $match: {
                                    $and: [
                                        {
                                            $expr: {
                                                $eq: ["$$attId", "$_id"]
                                            }
                                        }
                                    ]
                                },

                            }, {

                                $addFields: {
                                    position: "$$pos"
                                }
                            }

                        ],
                        as: "attribute_details",
                    },
                },
                {$unwind:"$attribute_details"},
                { $project: { attributes: 0,  } },
                {
                    $group:{
                        _id:"$_id",
                        formDetail:{$first:"$$ROOT"},
                        all_attribute_details:{$push:"$attribute_details"}
                    }
                }
            ]
        )
        if (dynamicForm != null) {
            return res.json({ msg: 'All Form found ', status: true, data: dynamicForm })
        }
        else {
            return res.status(400).json({ msg: 'All form could not be found.', status: false })
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.deleteById = async (req, res, next) => {
    try {
        const form_id = req.params.id
        if (!form_id) {
            return res.status(400).json({ msg: 'Please provide id', status: false })
        }
        DynamicForm.findByIdAndDelete(form_id, (er, doc) => {
            if (!er) {
                return res.json({ msg: 'Form deleted', status: true, })
            }
            else {
                return res.status(400).json({ msg: 'Form could not be deleted.', status: false })
            }
        })
    }
    catch (error) {
        next(error)
    }
}