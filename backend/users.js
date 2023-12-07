const express = require('express');


//getting the controllers' functions
const {signupUser, loginUser,adminDisableUser,adminEnableUser} = require('./usercontroller.js');

const router = express.Router();
//log-in
router.post('/login', loginUser);

//sign-up
router.post('/signup', signupUser);

router.post('/admin/disable', adminDisableUser);
router.post('/admin/enable', adminEnableUser);


module.exports = router;
