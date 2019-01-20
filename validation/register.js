const Validator = require('validator');
const checkInput = require('./checkInput');

module.exports = function validateRegInput(input){
    let errors = {};

    if(checkInput(input.name))    
        input.name = '';
    if(checkInput(input.password))    
        input.password = '';

    if(checkInput(input.confirmPassword))    
        input.confirmPassword = '';

    if(checkInput(input.email))    
        input.email = '';
        
    if(!Validator.isLength(input.name,{min: 2, max: 20})){
       errors.name = 'Expected name length between 2 and 20 characters!'; 
    }

    // If empty name
    if(Validator.isEmpty(input.name)){
        errors.name = 'Name field is required!';
    }

    // If empty password
    if(Validator.isEmpty(input.password)){
        errors.password = 'Password field is required!';
    }

    // If valid password
    if(!Validator.isLength(input.password,{min: 6 , max: 50})){
        errors.password = 'Password length has to be at least 6 characters!';
    }

    // If empty password
    if(Validator.isEmpty(input.confirmPassword)){
        errors.confirmPassword = 'Confirm password field is required!';
    }

    // If password not match
    if(!Validator.equals(input.confirmPassword,input.password )){
        errors.confirmPassword = 'Password not match';
    }

    
     // If valid email
     if(!Validator.isEmail(input.email)){
        errors.email = 'Email is invalid!';
    }

    // If empty email
    if(Validator.isEmpty(input.email)){
        errors.email = 'Email field is required!';
    }
   
    return {
        errors,
        isValid:checkInput(errors)
    }
};