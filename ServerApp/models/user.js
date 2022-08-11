const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
});

userSchema.methods.generateAuthToken = function(){
    const token = Jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;
}

const User = mongoose.model("user",userSchema);

const validateUser = (data)=>{
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

const validateLogin = (data)=>{
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports= {User,validateUser,validateLogin};






