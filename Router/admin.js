const express=require('express')
const router=express.Router()
const multer = require('../middlware/multer')
const adminController=require('../controller/admincontroller')
const {session, adminSession} = require('../middlware/session-handler')


router.use(adminSession)



router.get('/home',adminController.getHome)

router.get('/addproduct',adminController.addProduct)

router.post('/addproduct',multer.single('image'),adminController.postAddproduct)

router.get('/edit/:id',adminController.getEditProduct)

router.post('/edit/:id',multer.single('image'),adminController.postEditProduct)

router.get('/delete/:id',adminController.deleteProduct)

router.get('/logout',adminController.getLogout)



module.exports=router