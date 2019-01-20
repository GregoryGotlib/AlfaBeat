const Validator = require('validator');
const checkInput = require('./checkInput');

module.exports = function validateCarInfoInput(input){
    let errors = {};

    /*if(checkInput(input.brand))    
        input.brand = '';
      */  
    if(checkInput(input.model))    
        input.model = '';

    if(checkInput(input.timeOfOwnerShip))    
        input.timeOfOwnerShip = '';

    if(checkInput(input.personalReview))    
        input.personalReview = '';

    if(checkInput(input.year))    
        input.year = '';

    if(checkInput(input.gearBox))    
        input.gearBox = '';

    if(checkInput(input.rating))    
        input.rating = '';
        
    /*// If vehicle  brand is empty
    if(Validator.isEmpty(input.brand)){
        errors.brand = 'vehicle  brand is required!';
    }
*/
    // If empty model field
    if(Validator.isEmpty(input.model)){
        errors.model = 'Model field is required!';
    }

    // If empty personal review field
    if(Validator.isEmpty(input.personalReview)){
        errors.personalReview = 'Your personal review is required!';
    }

    // If empty year field
    if(Validator.isEmpty(input.year)){
        errors.year = 'vehicle  year make is required!';
    }

    // If gearbox field is empty
    if(Validator.isEmpty(input.gearBox)){
        errors.gearBox = 'vehicle  gearbox is required!';
    }

    // If empty years of ownership field
    if(Validator.isEmpty(input.timeOfOwnerShip)){
        errors.timeOfOwnerShip = 'Time of ownership field is required!';
    }

    if(Validator.isEmpty(input.rating)){
        errors.rating = 'Please rate the reliability of your vehicle !';
    }

    return {
        errors,
        isValid:checkInput(errors)
    }
};