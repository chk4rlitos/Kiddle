
const {Router} = require('express');
const router = Router();



const {renderNewRegisterForm,Access, renderBeginSesionForm,Begin, logout} = require('../controllers/user.controller');

router.get('/users/new-register', renderNewRegisterForm);
router.post('/users/new-register', Access);


router.get('/users/begin-session', renderBeginSesionForm);
router.post('/users/begin-session', Begin);

router.get('/users/logout', logout);





module.exports = router;