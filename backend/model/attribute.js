const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attributeSchema = new Schema({
    type: {
        type: String,
        enum: {
            values: ['button', 'input', 'text'],
            message: "{VALUE} is not supported.Supported value: 'button', 'input', 'text'  "
        },
        required: true
    },
    name: {
        type:String,
        required: true
    },
    inputType: {
        type: String,
    },
    textContent:String,
    placeHolder: {
        type: String,
    },
    className: String,
    label:String,
    attId: String,
    readOnly:{
        type:Boolean,
        default:false
    },
    style:Object    
    
}, {
    timestamps: true,
});

const Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;