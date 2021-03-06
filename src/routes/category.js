const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../common-middleware/index')
const { addCategory, getAllCategory ,updateCategories ,deleteCategories} = require('../controller/category')
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


router.post('/category/create', requireSignin, adminMiddleware,upload.single('categoryImage') ,addCategory)
router.get('/category/getcategory', getAllCategory)
router.post('/category/delete', deleteCategories)
router.post('/category/update',upload.array('categoryImage') ,updateCategories)



module.exports = router;
