const {Router} = require('express');
const router =Router();


const { 
        renderListaPreviaKiddle,
        renderListaCompaniesxEscalasKiddle, 
        renderListaMenuxCompany,
        AgregarItem,
        QuitarItem,
        listarCarrito,
        MostrarSolicitudesPedido
      } 
      = require('../controllers/kiddle.controller');

const {isAuthenticated} = require('../helpers/auth.js');

router.get('/kiddle/list-kiddle-preview',isAuthenticated,renderListaPreviaKiddle);
router.get('/kiddle/list-companies-escalas-kiddle/:id/:name',isAuthenticated,renderListaCompaniesxEscalasKiddle);
router.get('/kiddle/list-kiddle-menuxcompany/:id/:name',isAuthenticated,renderListaMenuxCompany);
router.get('/kiddle/list-solicitudes/Pedidos/agregar/:menuId',isAuthenticated,AgregarItem);
router.get('/kiddle/list-solicitudes/Pedidos/quitar/:menuId',isAuthenticated,QuitarItem);
router.get('/kiddle/listarKiddle',isAuthenticated,listarCarrito);
router.get('/kiddle/list-solicitudes/Pedidos',isAuthenticated,MostrarSolicitudesPedido);

module.exports = router;
