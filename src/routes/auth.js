const express = require('express');
const { signup, signin } = require('../controller/auth')
const {validateSignUpRequest,isRequestValidated ,validateSignInRequest} =require('../validators/auth')
const router = express.Router();





router.post('/signin',validateSignInRequest,isRequestValidated, signin)

router.post('/signup',validateSignUpRequest,isRequestValidated,signup)



module.exports = router;