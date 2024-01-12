const express=require('express')
const router=express.Router()
const userController=require('../controller/usercontroller')
const {session, adminSession} = require('../middlware/session-handler')
const multer = require('../middlware/multer')
 
router.get('/login',userController.getLogin)

router.post('/login', userController.postLogin)

router.get('/signup',userController.getSignup)
router.post('/signup',userController.postSignup)

router.get('/addtocart',userController.addtoCart)


router.use(session)

router.get('/home', userController.getHome)

router.get('/setprofile', userController.setProfile)

router.post('/setprofile', multer.single('image') ,userController.postSetprofile)

router.get('/logout/:id',userController.getLogout)






module.exports=router 