const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;
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
    username:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        //DATA VALIDATION
    },
    admin : {
        type: Boolean
    },
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    }

})

//static method
userSchema.statics.signup = async function (email, username, password) {
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('email already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email,username,password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('email and password are required')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('email does not exist')
    }
    if (user.status === 'disabled') {
        throw Error('Account disabled, contact admin@user.com for support.')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('incorrect password')
    }
    if (match) {
        return user
    }
}

userSchema.statics.disableUser = async function (email) {
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Email does not exist');
    }
    if (user.status === 'disabled') {
        throw Error('Account is already disabled.');
    }
    user.status = 'disabled'; // Set the user's status to 'disabled'
    await user.save(); // Save the updated user document
    return user;
};


userSchema.statics.enableUser = async function (email) {
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Email does not exist');
    }
    if (user.status === 'active') {
        throw Error('Account is already enabled.');
    }

    user.status = 'active'; // Set the user's status to 'active'
    await user.save(); // Save the updated user document
    return user;
};

module.exports = mongoose.model('User', userSchema);