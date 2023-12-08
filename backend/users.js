const express = require('express');


//getting the controllers' functions
const {signupUser, loginUser,adminDisableUser,adminEnableUser,revokeAdminUser,grantAdminUser,adminStatus} = require('./usercontroller.js');

const router = express.Router();
//log-in
router.post('/login', loginUser);

//sign-up
router.post('/signup', signupUser);

router.post('/admin/disable', adminDisableUser);
router.post('/admin/enable', adminEnableUser);

router.post('/admin/revoke', revokeAdminUser);
router.post('/admin/grant', grantAdminUser);

router.get('/admin/status', adminStatus);


module.exports = router;
