
const session = (req,res,next)=>{
    if(req.session.email){
        next()
    }else{
        res.redirect('/user/login')
    }
}



const adminSession=(req,res,next)=>{
    if(req.session.admin){
        next()
    }else{
        res.redirect('/user/login')
    }
}

module.exports= {session, adminSession}


