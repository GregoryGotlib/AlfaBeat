// Social profile Handler
 

// CONST
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateCarInfoInput = require('../../validation/carInfo');
const multer = require('multer');
const fs = require('fs');


// Multer settings
const storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null,'./client/public/uploads/')
    },

    filename: function (request, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
};
const upload = multer({
    storage:storage,
    fileFilter: fileFilter
});


// Get profile 
router.get('/', passport.authenticate('jwt',{session: false }),(req, res) => {
      const errors = {};
      Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
          if (!profile) {
            return res.status(404).json({notfound:'Profile not found!'});
          }
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    }
  );


// Post/Update profile
router.post('/', passport.authenticate('jwt',{session: false}), (req,res)=>{
    const {errors,isValid} = validateProfileInput(req.body);

    // Check profile validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const profilesData = {};
    profilesData.user = req.user.id;
    profilesData.social = {};
    
    // Loading data
    if(req.body.youtube){
        profilesData.social.youtube = req.body.youtube;
    }

    if(req.body.facebook){
        profilesData.social.facebook = req.body.facebook;
    }

    if(req.body.instagram){
        profilesData.social.instagram = req.body.instagram;
    }
    
    if(req.body.route){
        profilesData.route = req.body.route;
    }

    if(req.body.location){
        profilesData.location = req.body.location;
    }

    if(req.body.profession){
        profilesData.profession = req.body.profession;
    }
      Profile.findOne({user: req.user.id}).then(profile =>{
        if(profile){
            // In case of existing profile - > updating..
            Profile.findOneAndUpdate({user:req.user.id},{$set: profilesData}, {new:true}).then(profile=>{
                res.json(profile)
            });
        }
        else{
            // In case of new profile - > create..
            Profile.findOne({route: profilesData.route}).then(profile=>{
                if(profile){
                    return res.status(400).json('That route already exists!');
                }
                new Profile(profilesData).save().then(profile=>{
                    res.json(profile)
                });
            }).catch(error=>{
                res.status(404).json(error);
            });
        }
    }).catch(error=>{
        res.status(404).json(error);
    });
});


// Get profile by route
router.get('/route/:route',(req,res)=>{
    Profile.findOne({route: req.params.route}).populate('user',['name','avatar']).then(profile =>{
        if(!profile){
            return res.status(404).json({msg:'Profile not found!'})
        }
        res.json(profile);
    }).catch(error=>{
        res.status(404).json(error);
    });
});

// Get profile by user id
router.get('/user/:user_id',(req,res)=>{
    Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar']).then(profile =>{
        if(!profile){
           return res.status(404).json({msg:'Profile not found!'})
        }
        res.json(profile);
    }).catch(error=>{
        res.status(404).json({profile:'There is no profile for this user!'});
    });
});


// Get all profiles 
router.get('/all',(req,res)=>{
    Profile.find().populate('user',['name','avatar']).then(profiles=>{
        if(!profiles){
            return res.status(404).json({profiles: 'There or no profiles available!'});
        }
        res.json(profiles);
    }).catch(error=>{
        res.status(404).json(error);
    });
});



// Post car information 
router.post('/carinfo', passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validateCarInfoInput(req.body);

    // Check car info form validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id}).then(profile=>{ 
        const newCarInfo = {
            brand:'Alfa Romeo',
            model:req.body.model,
            year:req.body.year,
            timeOfOwnerShip:req.body.timeOfOwnerShip,
            personalReview:req.body.personalReview,
            gearBox:req.body.gearBox,
            current:req.body.current,
            rating:req.body.rating
        }

        profile.carInfo.unshift(newCarInfo);
        profile.save().then(profile=>{
            res.json(profile);
        });
    }).catch(error=>{
        res.status(404).json(error);
    });
});


// Delete car information 
router.delete('/carinfo/:carinfo_id', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id}).then(profile=>{ 
    const index = profile.carInfo.map(item => item.id).indexOf(req.params.carinfo_id);
    profile.carInfo.splice(index,1);
    profile.save().then(profile=>{
        res.json(profile);
    })    
    }).catch(error=>{
        res.status(404).json(error);
    });
});


// Delete profile
router.delete('/', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndRemove({user: req.user.id}).then(()=>{
        User.findOneAndRemove({_id:req.user.id}).then(()=>{
            res.json({ProfileDeleted: true })
        })
    });
});

// Post image
router.post('/img_data',upload.single('image'),passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    const file = req.file;
    Profile.findOne({user: req.user.id}).then(profile=>{ 
      
        var img = fs.readFileSync(file.path);
        var encImg = img.toString('base64');
        const newImg = {
            data:new Buffer(encImg,'base64'),
            contentType:file.mimetype,
            name:file.originalname,
            path:`/uploads/${file.originalname}`
        };        
        //console.log(newImg);
        //newImg.save()
        profile.image.push(newImg);
    
        profile.save().then(profile=>{
            res.json(profile);
        });
    }).catch(error=>{
        res.status(404).json(error);
    });
});

// Delete image
router.delete('/img_data/:image_id', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id}).then(profile=>{ 
    const index = profile.image.map(image => image.id).indexOf(req.params.image_id);
    profile.image.splice(index,1);
    profile.save().then(profile=>{
        res.json(profile);
    })    
    }).catch(error=>{
        res.status(404).json(error);
    });
});

module.exports = router;