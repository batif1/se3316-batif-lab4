const express = require('express');


//getting the controllers' functions
const {signupUser, loginUser} = require('./usercontroller.js');

const router = express.Router();
//log-in
router.post('/login', loginUser);

//sign-up
router.post('/signup', signupUser);

module.exports = router;
