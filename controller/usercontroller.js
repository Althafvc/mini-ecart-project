const userModel = require('../models/signupDatas')
const bcrypt = require('bcrypt')
const flash = require('connect-flash')
const dataModel = require('../models/signupDatas')
const productsModel = require('../models/productDetails')
const profileModel = require('../models/profileDatas')
const mongoose  = require('mongoose')


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/





exports.getLogin = (req, res) => {
  if(req.session.email){
    res.redirect('/user/home')
  }
  else{
    res.render('login')
  }
}











exports.postLogin = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
      console.log('error occured while finding the user');

    } else {
      const passwordMatch = await bcrypt.compare(password, user.password)
        
      if (passwordMatch) {
        if (user.role == true) {
          req.session.admin=true
          res.redirect('/admin/home')
        } else {

          // req.session.email = email
          
          req.session.email = email
          res.redirect('/user/home')
        }
      } else {
        console.log('invalid password');
      }
    }


  } catch (err) {
    console.log(err);
    console.log('error occured', err);
  }

}













exports.getSignup = (req, res) => {
  if(req.session.email){
    res.redirect('/user/home')
  }
  else{
    res.render('signup', { error: req.flash('error') })
  }
}
















exports.postSignup = async (req, res) => {

  const { email, password, confirmpassword, phone, name } = req.body

  try {

    const salting = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salting)
    const newSchema = new userModel({
      email, name, phone,
      password: hashedpassword,
      role: false
    })
    let signupDatas = await userModel.find()

    let userExist = signupDatas.find((val) => val.email === email)

    if (userExist) {
      req.flash('error', 'user already exist, go to login')
      res.redirect('/user/signup')

    } else if (!emailRegex.test(email)) {
      req.flash('error', 'invalid email format')
      res.redirect('/user/signup')
    }

    else if (!passwordRegex.test(password)) {
      req.flash('error', 'invalid password format')
      res.redirect('/user/signup')
    }
    
    else {
      
      await newSchema.save()
      res.redirect('/user/login')
    }




  } catch (err) {
    console.log('error at postSignup', err);
  }
}


exports.getHome= async(req,res)=>{

  try {
    let datas=  await productsModel.find()
    
      res.render('home',{datas})
  } catch (error) {
    console.log(err);
  }
}

exports.setProfile= async (req,res)=>{

  const email = req.session.email
  const userdata =await dataModel.findOne({email})
  const id = new mongoose.Types.ObjectId(userdata._id)
  const userDetails  =  await dataModel.aggregate([
    
      {$match:{_id:id}},
      {$lookup:{
          from:'profiledatas',
          localField:'_id',
          foreignField:'address',
          as:'address'
      }
    }
  
  ])
  const fullData = userDetails[0]
  console.log(fullData);
  res.render('userprofile',{fullData})
}

exports.postSetprofile= async (req,res)=>{
  let datas = req.body
  const {filename}=req.file
 

  const email = req.session.email;

    const userDatas =await dataModel.findOne({email})

    const {housename, housenumber, city, district, state, nationality } = datas
    
    const userId = new mongoose.Types.ObjectId(userDatas._id);

    await profileModel.updateOne(
      {address:userId},
      {
        $set:{
          housename,
           housenumber, 
           city,
            district, 
            state, 
            nationality,
            imagePath:filename
        }
      },
      {upsert:true}
    )
    res.redirect('/user/home')
      
}

exports.getLogout= (req,res)=>{
  req.session.destroy()
  res.redirect('/user/login')
}


exports.addtoCart= (req,res)=>{
  res.render('add-to-cart')
}





















