const User = require('./userModel.js');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id},'rjrjjrr',{expiresIn: '3d'})
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const adminDisableUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.disableUser(email);
        res.status(200).json({ email })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const adminEnableUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.enableUser(email);
        res.status(200).json({ email })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//sign up user
const signupUser = async (req,res) => {
    const {email,username,password} = req.body;

    try{
        const user = await User.signup(email, username,password);
        const token = createToken(user._id);

        res.status(200).json({email, token})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

// Grant admin privileges to a user
const grantAdminUser = async (req, res) => {
    const { email } = req.body;
    try {
        await User.grantAdmin(email);
        res.status(200).json({ email, message: 'Admin privileges granted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Revoke admin privileges from a user
const revokeAdminUser = async (req, res) => {
    const { email } = req.body;
    try {
        await User.revokeAdmin(email);
        res.status(200).json({ email, message: 'Admin privileges revoked' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const adminStatus = async (req, res) => {
    const { email } = req.query; // Use req.query to get query parameters from the URL
    try {
        console.log('adminStatus')
        console.log(email)
        const isAdmin = await User.adminStat(email);
        const message = isAdmin ? 'User has admin privileges' : 'User does not have admin privileges';
        res.status(200).json({ email, message });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




module.exports = {signupUser, loginUser,adminDisableUser,adminEnableUser,grantAdminUser,revokeAdminUser,adminStatus}