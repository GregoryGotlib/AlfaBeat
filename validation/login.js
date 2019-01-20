const Validator = require('validator');
const checkInput = require('./checkInput');

module.exports = function validateLoginInput(input){
    let errors = {};

   
    if(checkInput(input.password))    
        input.password = '';

    if(checkInput(input.email))    
        input.email = '';
        
   
    // If empty password
    if(Validator.isEmpty(input.password)){
        errors.password = 'Password field is required!';
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