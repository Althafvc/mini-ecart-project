const productsModel=require('../models/productDetails')
const dataModel = require('../models/signupDatas')
const multer  = require('multer')
const ObjectId= require('mongoose').Types.ObjectId


exports.getHome = async (req,res)=>{


    try {
        let datas=  await productsModel.find()
        
        res.render('admin-home',{datas})


      } catch (error) {
        console.log(err);
      }
  

     
}


exports.addProduct= (req,res)=>{
    res.render('product-adding-form')
}

exports.postAddproduct=  async (req,res)=>{

    let {name,price,color}=req.body

    try{
          if(!req.file){
            return res.send('nofile')
          }
          const image = req.file.filename
          const products = new productsModel({name,price,color,image})
          await products.save()
          res.redirect('/admin/home')

    }
    catch(err){
        console.log('error occured', err);
    }
    
}


exports.getEditProduct=async (req,res)=>{
    const id = new ObjectId(req.params.id)
    console.log('print');
    let data=await productsModel.findOne({_id:id})
    console.log(data);
    res.render('admin-product-edit', {data}) 
}

exports.postEditProduct= async (req,res)=>{

  const {name,price, color}= req.body
  const {filename}=req.file

const id = new ObjectId(req.params.id)
   
    await productsModel.updateOne({_id:id},{$set:{
        name,
        price,
        color,
        image:filename
    }})
    
}

exports.deleteProduct = async (req,res)=>{
   const id = req.params.id
    await productsModel.deleteOne({_id:id})
    res.redirect('/admin/admin-home')
} 

exports.getLogout= (req,res)=>{
    req.session.destroy()
    res.redirect('/user/login')
  }


