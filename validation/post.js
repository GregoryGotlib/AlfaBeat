const Validator = require('validator');
const checkInput = require('./checkInput');

module.exports = function validatePostInput(input){
    let errors = {};

    if(checkInput(input.text))    
        input.text = '';

    if(!Validator.isLength(input.text,{min:2,max:100})){
        errors.text = 'Text should be between 2 and 100 characters!';
    }
        
    if(Validator.isEmpty(input.text)){
        errors.text = 'You can not post an empty text!';
    }
    
    return {
        errors,
        isValid:checkInput(errors)
    };
};