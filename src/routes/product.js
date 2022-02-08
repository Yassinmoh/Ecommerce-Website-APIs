const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../common-middleware/index')
const Product = require('../models/product')
const { createProduct ,getProductsBySlug } = require('../controller/product')
const multer = require('multer')
const shortid =require('shortid')
const path = require('path')






const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null,shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({storage})




router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPictures'), createProduct)
router.get('/products/:slug',getProductsBySlug)




// router.get('/category/getcategory', getAllCategory)




module.exports = router;
