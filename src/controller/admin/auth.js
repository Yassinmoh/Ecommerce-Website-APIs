const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv')
const bcrypt = require('bcrypt')
const shortid = require('shortid');
env.config()

//SIGNUP: 

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user)
            return res.status(400).json({
                message: "Admin already registered",
            });

        User.estimatedDocumentCount(async (err, count) => {
            if (err) return res.status(400).json({ error });
            let role = "admin";
            if (count === 0) {
                role = "super-admin";
            }

            const { firstName, lastName, email, password } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                username: shortid.generate(),
                role,
            });

            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });
                }

                if (data) {
                    return res.status(201).json({
                        message: "Admin created Successfully..!",
                    });
                }
            });
        });
    });
};

//SignIN:

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {

                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY)
                    res.cookie('token', token, { expiresIn: '1d' })
                    res.status(200).json({ token, user })
                } else {
                    res.status(500).json('Invaled Password')
                }
            } else {
                res.status(500).json("Admin Not Found you must Register")
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Something happend Error", err })
        })
}

//Auth Guard
exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization
    const user = jwt.verify(token, process.env.SECRET_KEY)
    req.user = user
    next()
}

//SIGNOUT
exports.signout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        message: 'Admin Sign Out Successfuly'
    })
}
