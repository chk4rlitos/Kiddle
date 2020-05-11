
const {Router} = require('express');
const router = Router();



const {
       renderNewRegisterForm,
       Access,
       renderBeginSesionForm,
       Begin,
       logout,
       renderListarUsuarios,
       renderBuscarUsuarios,
       renderEditarUsuarios,
       renderEditarUsuariosForm       
    } 
= require('../controllers/user.controller');
const {isAuthenticated,isSuperUser} = require('../helpers/auth.js');

router.get('/users/new-register', renderNewRegisterForm);
router.post('/users/new-register', Access);


router.get('/users/begin-session', renderBeginSesionForm);
router.post('/users/begin-session', Begin);

router.get('/users/logout', logout);

router.get('/users/listar-usuarios', isAuthenticated,isSuperUser, renderListarUsuarios);
router.get('/users/buscar-usuarios', isAuthenticated,isSuperUser, renderBuscarUsuarios);
router.get('/users/edit-users/:id', isAuthenticated,isSuperUser, renderEditarUsuarios);
router.put('/users/edit-users/:id', isAuthenticated,isSuperUser, renderEditarUsuariosForm);


module.exports = router;