const mongoose= require('mongoose')

const schema = {
    housename:{
        type:String,
        
    },

    housenumber:{
        type:Number,
        
    },

    city:{
        type:String,
       

    },

    district:{
       type:String
    },

    state:{
        type:String
     },

     nationality:{
        type:String
     },

     address:{type: mongoose.Types.ObjectId},
     imagePath:{
        type:String
     }
}

const profileSchema= new mongoose.Schema(schema)
const profileModel=new mongoose.model('profileDatas',profileSchema)

module.exports = profileModel