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

//Where to store uploads
const storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null,'uploads/')
    },

    filename: function (req, file, cb) {
        var imageName = file.originalname;
        //imageName += "_randomstring"
        cb(null, imageName);
    }
});

//Filtering image type only
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


//api/profile -> 
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

// @route POST api/profile
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
    /*
    if (req.body.model) {
        profilesData.model = req.body.model;
    }
    */
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

// @route GET api/profile/route/:route
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

// @route GET api/profile/user/:user_id
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

// @route GET api/profile/all/
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


// @route POST api/profile/carInfo
// post car information 
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

// @route DELETE api/profile/carInfo/:carinfo_id
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


// @route DELETE api/profile
router.delete('/', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndRemove({user: req.user.id}).then(()=>{
        User.findOneAndRemove({_id:req.user.id}).then(()=>{
            res.json({ProfileDeleted: true })
        })
    });
});


router.post('/img_data',upload.single('image'),passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    console.log('shit')
    Profile.findOne({user: req.user.id}).then(profile=>{ 
        console.log('shit found profile')
        var img = fs.readFileSync(req.file.path);
        var encImg = img.toString('base64');
        const newImg = {
            data:new Buffer(encImg,'base64'),
            contentType:req.file.mimetype,
            name:req.file.originalname,
            path:req.file.path
        };
        console.log(newImg);

        profile.image.unshift(newImg);
        profile.save().then(profile=>{
            res.json(profile);
        });
   
    }).catch(error=>{
        res.status(404).json(error);
    });
});

/*
router.post('/img_data',upload.single('image'),passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id}).then(profile=>{ 
        const newImg = {
            data:req.file.path
        };
        console.log(newImg);
        profile.image.push(newImg);
        profile.save().then(profile=>{
            res.json(profile);
        });
    }).catch(error=>{
        res.status(404).json(error);
    });
});
 */

/*
router.delete('/photo/:photo_id', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id}).then(profile=>{ 
    const index = profile.photos.map(item => item.id).indexOf(req.params.photo_id);
    profile.photos.splice(index,1);
    profile.save().then(profile=>{
        res.json(profile);
    })    
    }).catch(error=>{
        res.status(404).json(error);
    });
});
*/
module.exports = router;