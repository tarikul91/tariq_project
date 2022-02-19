const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Email is invalid']

    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    picture:{
        type:String,
    },
    accessToken: {
        type: String
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;