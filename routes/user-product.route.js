const express = require('express');
const router = express.Router();

const userProductController = require('../controllers/user-product.controller');

router.get('/', userProductController.findAll);
//to epomeno einai to aggragate diladi oi praksei athroismatos pou exoume kanei gia na suleksw statistika sxetika me tis agores kapoiou xristi...
router.get('/stats1', userProductController.stats1);
router.get('/:username', userProductController.findOne);
router.post('/', userProductController.addProduct);
router.patch('/:username/', userProductController.updateProduct);
router.delete('/:username/products/:product', userProductController.deleteProduct);

module.exports = router;
