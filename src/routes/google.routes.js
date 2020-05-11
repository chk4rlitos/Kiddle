
const {Router} = require('express');
const router = Router();
const passport = require('passport');



router.get('/auth/google', passport.authenticate('google', {scope:['openid', 'email', 'profile']}));
router.get('/auth/google/callback', passport.authenticate('google',
  { 
   successRedirect: '/profile',
   failureRedirect: '/users/begin-session' 
  }
));

module.exports = router;