const {Router} = require('express');
const router =Router();

const {
        renderCompany,
        renderNewCompany,
        renderNewCompanyForms,
        renderEditarCompany,
        renderEditarCompanyForm
} = require('../controllers/company.controller');

const {isAuthenticated} = require('../helpers/auth.js');


router.get('/company/list-company', isAuthenticated, renderCompany,function(req,res,next){    
    next();
});

router.get('/company/new-company',isAuthenticated,renderNewCompany, function(req,res,next){
    next();
});

router.post('/company/new-company',isAuthenticated,renderNewCompanyForms, function(req,res,next){
    next();
});

router.get('/company/edit-company/:id',isAuthenticated,renderEditarCompany, function(req,res,next){
    next();
});

router.put('/company/edit-company/:id',isAuthenticated,renderEditarCompanyForm, function(req,res,next){
    next();
});

module.exports = router;