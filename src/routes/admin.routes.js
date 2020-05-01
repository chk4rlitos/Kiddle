const {Router} = require('express');
const router =Router();

const {renderAdmin} = require('../controllers/admin.controller');


router.get('/admin',renderAdmin);

module.exports = router;