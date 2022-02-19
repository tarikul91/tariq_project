const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const root = 'http://localhost:5000/'

module.exports.signup = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({message:'Photo is required',status:false})
        }
        const {
            email,
            name,
            password,
            phone
        } = req.body
        if (!email || !name || !password || !phone) {
            return res.status(400).json({ msg: 'Please fill all the field', status: false })
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ msg: 'Password must be 6 character ', status: false })
        }
        const existUser = await User.findOne({ email: email })
        if (existUser) {
            return res.status(400).json({ msg: 'User already exist', status: false })
        }
        // const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashPassword,
            phone,
            picture: root+req.file.path
        })
        await newUser.save()
        res.json({ msg: 'New user added', status: true ,data:newUser})
    }
    catch (error) {
        next(error)
    }
}
module.exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password,
        } = req.body
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and Password required', status: false })
        }
        const existUser = await User.findOne({ email: email })
        if (!existUser) {
            return res.status(400).json({ msg: 'Email or Password is incorrect', status: false })
        }
        const checkpassword = bcrypt.compareSync(password, existUser.password);
        if (!checkpassword) {
            return res.status(400).json({ msg: ' Email or Password is incorrect', status: false })
        }
        console.log(existUser._id)
        const token = jwt.sign({
            _id: existUser._id
        }, process.env.JWT_SECRET, { expiresIn: Number(process.env.JWT_TIME) })

        User.findByIdAndUpdate(existUser._id, { accessToken: token }).exec((er, doc) => {
            if (!er) {
                res.json({
                    data: {
                        name: existUser.name,
                        _id: existUser._id,
                        token,
                        status: true,
                        email: existUser.email,
                        phone:existUser.phone,
                    },
                    status: true,
                    msg: "Login successful"
                })
            }
            else {
                return res.status(400).json({ msg: ' Something went wrong', status: false })

            }
        })
    }
    catch (error) {
        next(error)
    }
}


module.exports.auth = async (req, res, next) => {
    try {
        // return res.send(req.user)
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ msg: "Please provide token.", status: false })
        }
        const token = authHeader.split(' ')[1];
        const user_id = jwt.verify(token, process.env.JWT_SECRET, (er, decode) => {
            if (!er) { 
                console.log("decode",decode)
                return decode._id }
            else return null
        });
        let user = null
        if (user_id) {
            user = await User.findById(user_id)
            if (user.accessToken !== token) {
                return res.status(400).json({ msg: "User is logged out please login.", status: false })
            }
        } else {
            return res.status(400).json({ msg: "Session is time out or Token is not valid. authentication failed.", status: false })
        }
        const response = {
            _id: user._id,
            email: user.email,
            name: user.name
        }
        res.status(200).json({ msg: "Authentication successful", status: true, data: response })
    }
    catch (error) {
        next(error)
    }
}
module.exports.logout = async (req, res, next) => {
    try {
        const id = req.params.id
        await User.findOneAndUpdate({ id: id }, { accessToken: '' })
        res.status(200).json({ msg: "Logged Out", status: true })
    }
    catch (error) {
        next(error)
    }
} 