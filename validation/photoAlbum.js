const Validator = require('validator');
const checkInput = require('./checkInput');

module.exports = function validatePhotoInput(input){
    let errors = {};

    
    if(checkInput(input.description))    
        input.description = '';
        
    if(Validator.isEmpty(input.description)){
        errors.description = 'Please add photo description';
    }

    return {
        errors,
        isValid:checkInput(errors)
    }
};