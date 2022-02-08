const User = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv')
const bcrypt = require("bcrypt");
const shortid = require("shortid");
env.config()
// const {validationResult} = require('express-validator')
//SIGNUP: 

const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET_KEY, {
        expiresIn: "1d",
    });
};

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user)
            return res.status(400).json({
                error: "User already registered",
            });

        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate(),
        });

        _user.save((error, user) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong",
                });
            }

            if (user) {
                const token = generateJwtToken(user._id, user.role);
                const { _id, firstName, lastName, email, role, fullName } = user;
                return res.status(201).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                });
            }
        });
    });
};


//SignIN:

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY)
                    res.status(200).json({ token, user })
                } else {
                    res.status(500).json('Invaled Password')
                }
            } else {
                res.status(500).json("User Not Found you must Register")
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Something happend Error", err })
        })
}


