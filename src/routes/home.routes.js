const {Router} = require('express');
const router =Router();

const  {renderHomer} = require('../controllers/home.controller');

router.get('/', renderHomer)

module.exports = router;