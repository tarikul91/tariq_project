const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    formName: {
        type: String,
        required: true,
    },
    className: String,
    style: {
        backgroundColor: String,
        width: String,
        height: String,
    },
    url:{
        type:String,
        required: true,

    },
    method:{
        type:String,
        required: true,
        enum:['post','get','delete','put']
    },
    attributes: [
        {
            attribute: {
                type: Schema.ObjectId,
                ref: 'Attribute',
            },
            position: Number,
        }
    ]
}, {
    timestamps: true,
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;