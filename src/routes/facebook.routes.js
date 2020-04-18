
const {Router} = require('express');
const router = Router();
const passport = require('passport');



router.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { 
   successRedirect: '/user/profile',
   failureRedirect: '/users/begin-session' 
  }
));

module.exports = router;