// Social Handler

const express = require('express');
const router = express.Router();

// @route   GET api/profile/test
router.get('/test', (req,res)=>{
    res.json({msg:'Inside profile...'})
});

module.exports = router;