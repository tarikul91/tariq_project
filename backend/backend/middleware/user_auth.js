const jwt = require('jsonwebtoken')
const User = require('../model/user')
const auth = async (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ msg: "Please provide token.", status: false })
        }
        const token = authHeader.split(' ')[1];

        const user_id = jwt.verify(token, process.env.JWT_SECRET, (er, decode) => {
            if (!er) { return decode.id }
            else return null
        });
        let _user = null
        if (user_id) {
            _user = await User.findById(user_id).select('accessToken _id email name')
            if (_user.accessToken !== token) {
                return res.status(400).json({ msg: "User is logged out please login.", status: false })
            }
        } else {
            return res.status(400).json({ msg: "Session is time out or Token is not valid. authentication failed.", status: false })
        }
        req.user = _user._id
        next()
    }
    catch(error){
        next(error)
    }
}
module.exports = auth