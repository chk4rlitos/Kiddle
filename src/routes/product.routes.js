const {Router} =require('express');
const router =Router();


const {
        renderProducts,
        renderProductForm,
        createNewProduct,
        renderUpdateProduct,
        renderUpdateProductForm,
        renderDeleteProduct,
        renderDeleteProductForm
}
 = require('../controllers/product.controller');
const {isAuthenticated} = require('../helpers/auth.js');

router.get('/product/list-product',isAuthenticated,renderProducts);

router.get('/product/new-product',isAuthenticated,renderProductForm);
router.post('/product/new-product',isAuthenticated,createNewProduct);

router.get('/product/edit-product/:id',isAuthenticated,renderUpdateProduct);
router.put('/product/edit-product/:id',isAuthenticated,renderUpdateProductForm);

router.get('/product/delete-product/:id',isAuthenticated,renderDeleteProduct);
router.put('/product/delete-product/:id',isAuthenticated,renderDeleteProductForm);

module.exports = router;