const env = require("dotenv");
env.config()
const jwt = require("jsonwebtoken")
//Auth Guard
exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY)
        req.user = user
    } else {
        return res.status(400).json('Not Authorize')
    }
    next()
}


exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        res.status(400).json('User access Denied')
    }
    next()
}



exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(400).json('Admin access Denied')
    }
    next()
}
