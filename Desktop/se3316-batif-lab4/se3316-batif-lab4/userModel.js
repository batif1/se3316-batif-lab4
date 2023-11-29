const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;
console.log('userModel.js loaded')
console.log('userModel.js loaded')
console.log('userModel.js loaded')
console.log('userModel.js loaded')


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that each list name is unique
        //DATA VALIDATION
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        //DATA VALIDATION
        minlength: 3,
        maxlength: 50
    }

})

//static method
userSchema.statics.signup = async function (email, password){
    const exists = await this.findOne({email})
    if(exists){
        throw Error('email already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash})

    return user

}

module.exports = mongoose.model('User', userSchema);