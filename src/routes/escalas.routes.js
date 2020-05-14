const {Router} = require('express');
const router =Router();


const {
        renderEscalas,
        renderNewEscalas,
        renderNewEscalasForm,
        renderEditarEscalas,
        renderEditarEscalasForm
     } = require('../controllers/escalas.controller');
const {isAuthenticated} = require('../helpers/auth.js');

router.get('/escalas/listar-categorias',isAuthenticated,renderEscalas);

router.get('/escalas/registrar-categorias',isAuthenticated,renderNewEscalas);
router.post('/escalas/registrar-categorias',isAuthenticated,renderNewEscalasForm);

router.get('/escalas/edit-escala/:id',isAuthenticated,renderEditarEscalas);
router.put('/escalas/edit-escala/:id',isAuthenticated,renderEditarEscalasForm);

module.exports = router;