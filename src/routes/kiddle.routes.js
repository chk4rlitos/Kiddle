const {Router} = require('express');
const router =Router();


const { 
        renderListaPreviaKiddle,
        renderListaCompaniesxEscalasKiddle, 
        renderListaMenuxCompany
      } 
      = require('../controllers/kiddle.controller');

const {isAuthenticated} = require('../helpers/auth.js');

router.get('/kiddle/list-kiddle-preview',isAuthenticated,renderListaPreviaKiddle);
router.get('/kiddle/list-companies-escalas-kiddle/:id/:name',isAuthenticated,renderListaCompaniesxEscalasKiddle);
router.get('/kiddle/list-kiddle-menuxcompany/:id/:name',isAuthenticated,renderListaMenuxCompany);


module.exports = router;
