// Post handler
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');
const Profile = require('../../models/Profile');

// @route   GET api/posts/test
router.get('/test', (req,res)=>{
    res.json({msg:'Inside Posts...'})
});

// @route POST api/posts
// Post new post
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body);

    // Check Post validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        name:req.body.name,
        text:req.body.text,
        avatar:req.body.avatar,
        user:req.user.id
    });
    newPost.save().then(post =>{
        res.json(post);
    });
})

// @route GET api/posts
// Get posts
router.get('/',(req,res)=>{
    Post.find().sort({date: -1}).then(posts=>{
        res.json(posts);
    }).catch(error=>{
        res.status(404).json({notfound:'Posts not found!'});
    });
});

// @route GET api/posts/:id
// Get posts by id
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id).then(post=>{
        res.json(post);
    }).catch(error=>{
        res.status(404).json({notfound:'There is no post with this id!'});
    });
});

// @route DELETE api/posts/:id
// Delete posts by user id
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id}).then(profile=>{
        Post.findById(req.params.id).then(post=>{
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({notauth:'User not authorized!'});
            }
            post.remove().then(() => res.json({postdeleted: true}));
        })
    }).catch(error=>{
        res.status(404).json({notfound: 'Post not found!'});
    });
   
});

// @route POST api/posts/like/:id
// Like post
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id}).then(profile=>{
        Post.findById(req.params.id).then(post=>{
           if(post.likes.filter(like => like.user.toString() === req.user.id).length>0){
               return res.status(400).json({cantlike:'User already liked this post!'});
           }
           post.likes.push({user: req.user.id});
           post.save().then(post=>{
               res.json(post);
           });
         })
    });
});

// @route POST api/posts/unlike/:id
// UnLike post
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id}).then(profile=>{
        Post.findById(req.params.id).then(post=>{
           if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
               return res.status(400).json({notliked:'User did not liked this post yet!'});
           }
           const index = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
           post.likes.splice(index,1);
           post.save().then(post=>{
               res.json(post);
           });
         }).catch(error=>{
             res.status(404).json({notfound:'Post not found!'});
         })
    });
});


// @route POST api/posts/comment/:id
// Comment on a post
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body);

    // Check Post validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id).then(post=>{
        const newComment = {
            name:req.body.name,
            text:req.body.text,
            avatar:req.body.avatar,
            user:req.user.id
        }

        post.comments.unshift(newComment);
        post.save().then(post=>{
            res.json(post);
        })
    }).catch(error=>{
        res.status(404).json({notfound:'Post not found!'});
    });
});

// @route DELETE api/posts/comment/:id/:comment_id
// Delete comment from post
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Post.findById(req.params.id).then(post=>{
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length ===0){
            return res.status(404).json({notfound:'Comment not found!'});
        }

        const index = post.comments.map(item=>item._id.toString()).indexOf(req.params.comment_id);
        post.comments.splice(index,1);
        post.save().then(post=>{
            res.json(post);
        });
    }).catch(error=>{
        res.status(404).json({notfound:'Post not found!'});
    });
});

module.exports = router;