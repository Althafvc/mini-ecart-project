const express=require('express')
const router=express.Router()
const userController=require('../controller/usercontroller')

router.get('/login',userController.getLogin)

router.post('/login',userController.postLogin)

router.get('/signup',userController.getSignup)
router.post('/signup',userController.postSignup)



module.exports=router