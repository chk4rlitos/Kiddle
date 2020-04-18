
const {Router} = require('express');
const router = Router();


const{renderProfile,renderProfileFb} = require('../controllers/profile.controller');

const {isAuthenticated} = require('../helpers/auth.js')

router.get('/user/profile', renderProfile); //isAuthenticated

module.exports=router;
