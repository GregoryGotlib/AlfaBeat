const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Profile Schema
const ProfileSchema = new Schema({
    user:{
        // Generate the user by its ID
        type:Schema.Types.ObjectId,
        ref:'users'
    },

    image:[{
        data:Buffer,
        date:{
            type:Date,
            default:Date.now
        },
        contentType:String,
        path:String,
        name:String
    }],

    route:{
        type:String,
        required:true,
        max:50 
    },

    location:{
        type:String,
    },

    profession:{
        type:String
    },

    date:{
        type:Date,
        default:Date.now
    },

    carInfo:[{

        brand:{
            type:String,
            required:true
        },

        model:{
            type:String,
            required:true
        },

        year:{
            type:String,
            required:true
        },
        
        timeOfOwnerShip:{
            type:String,
            required:true
        },

        personalReview:{
            type:String,
            required:true
        },

        gearBox:{
            type:String,
            required:true
        },
        
        current: {
            type:Boolean,
            default:false
          },
        
        rating:{
            type:String,
            required:true,
        }
    }],

    social:{
        youtube:{
            type:String
        },
      
        facebook:{
            type:String
        },

        instagram:{
            type:String
        },
    }

});


module.exports = Profile = mongoose.model('profile',ProfileSchema);