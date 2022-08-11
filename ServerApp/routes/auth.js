const router = require('express').Router();
const Joi = require('joi');
const {User,validateLogin} = require('../models/user');
const bcrypt = require('bcrypt');
const cors = require("cors");



router.post("/",cors(),async(req,res)=>{
    try{
        const{error} = validateLogin(req.body);
        if(error)
        return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(401).send({message:"Invalid Email or Password"});
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );

        if(!validPassword)
            return res.status(401).send({message:"Invalid Email or Password"});
        
        const token = user.generateAuthToken();
        res.status(200).send({data: token, message:"Logged in sucessfully"});
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
});

module.exports = router;