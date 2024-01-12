const mongoose= require('mongoose')


const schema = {
    name:{
        type:String,
        required:[true,'product name is required']
    },

    price:{
        type:Number,
        required:[true,'price is required']
    },

    color:{
        type:String,
        required:[true, 'color is required']

    },

    image:{
       type:String
    }
}


const productSchema= new mongoose.Schema(schema)
const productsModel=new mongoose.model('productDetails',productSchema)

module.exports = productsModel;