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


module.exports = {signupUser, loginUser}