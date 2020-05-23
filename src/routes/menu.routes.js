const {Router} = require('express');
const router =Router();

const {
    renderMenu,
    renderNewMenu,
    renderNewMenuForms,
    renderEditMenu,
    renderEditMenuForms
} = require('../controllers/menu.controller');

const {isAuthenticated,isSuperUser} = require('../helpers/auth.js');


router.get('/menu/list-menu/:id', isAuthenticated,isSuperUser, renderMenu,function(req,res,next){    
    next();
});

router.get('/menu/new-menu/:id',isAuthenticated,isSuperUser, renderNewMenu, function(req,res,next){
    next();
});

router.post('/menu/new-menu',isAuthenticated,isSuperUser, renderNewMenuForms, function(req,res,next){
    next();
});

router.get('/menu/edit-menu/:id',isAuthenticated,isSuperUser, renderEditMenu, function(req,res,next){
    next();
});
router.put('/menu/edit-menu/:id',isAuthenticated,isSuperUser, renderEditMenuForms, function(req,res,next){
    next();
});


module.exports = router;
