const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv').config()
const port=process.env.PORT || 7000
const path=require('path')
const session = require('express-session')
const flash=require('connect-flash')
const multer = require('multer');
const signupModel=require('./models/signupDatas')
const productsModel=require('./models/productDetails')


const userRouter=require('./Router/user')
const adminRouter=require('./Router/admin')



app.use(session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true
  }));


  


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(flash())






app.set('view engine','ejs')
app.set('views', 'views/src')

app.use(express.static('public'))
  

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },

});
const upload = multer({ storage: storage });

app.use('/user',userRouter)
app.use('/admin',adminRouter)

app.listen(port,()=> console.log(`server is listening as ${port}`));



mongoose.connect('mongodb://127.0.0.1:27017/E-cart')
.then(()=> console.log('Database connected'))
.catch((err)=> console.log('connection failed',err))

