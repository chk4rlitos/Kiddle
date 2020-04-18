
const {Router} = require('express');
const router = Router();
const passport = require('passport');

router.get('/oauth/twitter', passport.authenticate('twitter', {scope:['email']}));

router.get('/auth/twitter/callback', passport.authenticate('twitter',
    { 
        successRedirect: '/user/profile',
        failureRedirect: '/users/begin-session' 
    }
 ));
 
module.exports = router;