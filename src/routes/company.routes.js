const {Router} = require('express');
const router =Router();

const {
        renderCompany,
        renderNewCompany,
        renderNewCompanyForms,
        renderEditarCompany,
        renderEditarCompanyForm
} = require('../controllers/company.controller');

const {isAuthenticated, isSuperUser} = require('../helpers/auth.js');


router.get('/company/list-company', isAuthenticated,isSuperUser, renderCompany,function(req,res,next){    
    next();
});

router.get('/company/new-company',isAuthenticated,isSuperUser, renderNewCompany, function(req,res,next){
    next();
});

router.post('/company/new-company',isAuthenticated,isSuperUser, renderNewCompanyForms, function(req,res,next){
    next();
});

router.get('/company/edit-company/:id',isAuthenticated,isSuperUser, renderEditarCompany, function(req,res,next){
    next();
});

router.put('/company/edit-company/:id',isAuthenticated,isSuperUser, renderEditarCompanyForm, function(req,res,next){
    next();
});

module.exports = router;