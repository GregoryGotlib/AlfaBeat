// Auth handler

// CONST
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const grav = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//


// Register
router.post('/register',(req,res)=>{
    const { errors, isValid } = validateRegInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email: 'Email already exists!'});
        }
        else{
            const avatar = grav.url(req.body.email,{
                size:'150',
                rating:'pg',
                default:'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });
            bcrypt.genSalt(10,(error,salt)=>{
                bcrypt.hash(newUser.password, salt,(error,hash)=>{
                    if(error){
                        throw error;
                    }
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(error => console.log(error))
                });
            });
        }
    });
});

// Login
router.post('/login',(req,res)=>{
console.log('REQUEST BODY:',req.body)
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check registration validation
    if(!isValid){
        return res.status(400).json(errors);
    }


    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email}).then(user =>{
        if(!user){
            return res.status(404).json({email:'User not exists!'})
        }

        bcrypt.compare(password, user.password).then(isValid =>{
            if(isValid){
                const data = {id:user.id, name:user.name, avatar:user.avatar}
                // Sign this data into web token
                jwt.sign(data,keys.secretOrKey,{expiresIn:7200}, (error, token)=>{
                    res.json({success:true,token:'Bearer ' + token})
                });
            }
            else{
                return res.status(400).json({password:'Password incorrect!'})
            }
        });
    });
});

// Get current user
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json(req.user);
});

module.exports = router;