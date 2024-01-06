const userModel = require('../models/signupDatas')
const bcrypt = require('bcrypt')

exports.getLogin = (req, res) => {
  res.render('login')
}


exports.postLogin = async (req, res) => {
  
  try {
    const { email, password } = req.body;
console.log(req.body);
    const user = await userModel.findOne({email})

    if (!user) {
      console.log('error occured while finding the user');

    } else {
      const passwordMatch = await bcrypt.compare(password, user.password)

      if (passwordMatch) {
        console.log('login successfull');
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
  res.render('signup')
}

exports.postSignup = async (req, res) => {
  try {

    const { email, password, confirmpassword, phone, name } = req.body

    const salting = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salting)
    const newSchema = new userModel({
      email, name, phone,
      password: hashedpassword,
      confirmpassword: hashedpassword,
      role: false
    })

    await newSchema.save()
    res.redirect('/user/login')

  } catch (err) {
    console.log(err);
  }
}



















