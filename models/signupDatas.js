const mongoose=require('mongoose')

const schema = {
    name:{
        type:String,
        required:[true,'name is required']
    },

    phone:{
        type:Number,
        required:[true,'phone number is required']
    },

    email:{
        type:String,
        required:[true, 'E-mail is required']

    },

    password:{
        type:String,
        required:[true, 'password is required']
    },

    confirmpassword:{
        type:String,
        required:[true, 'your password and confirmpassword must be equal']
    },

    role:{
        type:Boolean
    }

}






const dataSchema= new mongoose.Schema(schema)
const dataModel=new mongoose.model('signupDatas',dataSchema)

module.exports = dataModel