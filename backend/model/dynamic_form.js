const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    formName: {
        type: String,
        required: true,
    },
    className: String,
    style: Object,
    url:{
        type:String,
        required: true,
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