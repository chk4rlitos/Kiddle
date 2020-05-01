const {Router} = require('express');
const router =Router();

const  {renderHomer,renderMessages} = require('../controllers/home.controller');

const {isAuthenticated} = require('../helpers/auth.js');

router.get('/', renderHomer)
router.get('/partials/messages',isAuthenticated, renderMessages)

module.exports = router;