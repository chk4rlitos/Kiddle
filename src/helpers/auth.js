const helpers={};

const User = require('../models/User');

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error_msg","Su ingreso es no autorizado");
    res.redirect('/users/begin-session');
}

helpers.isSuperUser = async (req,res,next)=>{
    const userState = await User.find({is_superuser:true, _id:req.user._id});
    if(userState.toString()){
        return next();
    }
    req.flash("error_msg", "El usuario no tiene acceso para visualizar Roles Administrativos");
    res.redirect('/profile');
}


module.exports=helpers;