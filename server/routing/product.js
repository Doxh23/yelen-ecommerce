const express = require('express')
const router = express.Router()
const {getAllProduct, createProduct,getOneProduct, updateProduct} = require('../controller/productController')





//product routing
router.route('/products').get(getAllProduct)
router.route('/product/:id').get(getOneProduct).put(updateProduct)
router.route('/product/new').post(createProduct)










module.exports = router