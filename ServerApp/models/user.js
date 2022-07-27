const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    fistname : {type: String, required: true},
    lastname : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
});

userSchema.methods.generateAuthToken = function(){
    const token = Jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;
}

const User = mongoose.Model("user",userSchema);

const validate = (data)=>{
    const schema = Joi.object({
        fistname: Joi.String().required().label("First Name"),
        lastname: Joi.String().required().label("Last Name"),
        email: Joi.String().required().label("Email"),
        password: Joi.String().required().label("Password")
    });
    return schema.validate(data);
}

module.exports(User,validate)






