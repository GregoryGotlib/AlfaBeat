const Validator = require('validator');
const checkInput = require('./checkInput');

module.exports = function validateProfileInput(input){
    let errors = {};

    if(checkInput(input.route))    
        input.route = '';

    if(checkInput(input.profession))    
        input.profession = '';
    
    /*
    if(checkInput(input.model))    
        input.model = '';
    */

    if(!Validator.isLength(input.route , {min: 2})){
        errors.route = 'Route has to be at least 2 characters!';
    }

    if(Validator.isEmpty(input.route)){
        errors.route = 'Profile route is required!';
    }

    if(Validator.isEmpty(input.profession,{min: 4})){
        errors.profession = 'Your profession is required!';
    }

    if(!checkInput(input.youtube)){
        if(!Validator.isURL(input.youtube)){
            errors.youtube = 'Invalid URL!';
        }
    }

    if(!checkInput(input.instagram)){
        if(!Validator.isURL(input.instagram)){
            errors.instagram = 'Invalid URL!';
        }
    }   

    if(!checkInput(input.facebook)){
        if(!Validator.isURL(input.facebook)){
            errors.facebook = 'Invalid URL!';
        }
    }
    /*
    if (Validator.isEmpty(input.model)) {
        errors.status = 'Alfa Romeo model is required';
      }
    */
    return {
        errors,
        isValid:checkInput(errors)
    }
};