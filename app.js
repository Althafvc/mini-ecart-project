const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv').config()
const port=process.env.PORT || 7000
const path=require('path')
const signupModel=require('./models/signupDatas')


const userRouter=require('./Router/user')
const adminRouter=require('./Router/admin')


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set('view engine','ejs')
app.set('views', 'views/src')

app.use(express.static('public'))

app.use('/user',userRouter)
app.use('/admin',adminRouter)

app.listen(port,()=> console.log(`server is listening as ${port}`));



mongoose.connect('mongodb://127.0.0.1:27017/E-cart')
.then(()=> console.log('Database connected'))
.catch((err)=> console.log('connection failed',err))

