const helpers={};


helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error_msg","Su ingreso es no autorizado");
    res.redirect('/users/begin-session');
}

module.exports=helpers;