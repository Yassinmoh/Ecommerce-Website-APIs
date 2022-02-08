const { check, validationResult } = require('express-validator')
exports.validateSignUpRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('First Name is Required..!'),
    check('lastName')
        .notEmpty()
        .withMessage('Last Name is Required..!'),
    check('email')
        .isEmail()
        .withMessage('Plz Enter a Valid Email Address..'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be more than 6 characters')
];


exports.validateSignInRequest = [
    check('email')
        .isEmail()
        .withMessage('Plz Enter a Valid Email Address..'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be more than 6 characters')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
};


