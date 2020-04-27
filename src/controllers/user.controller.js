
const userCtrl = {};
const passport = require('passport');

const User = require('../models/User');

userCtrl.renderNewRegisterForm = (req,res) =>{
    res.render('users/new-register');
}
userCtrl.Access = async (req,res) => {
    const errors = [];
    const {name,email,password,confirm_password} =req.body;
  
    if(password.length < 6){
        errors.push({text:"Usa 6 o más caracteres para tu contraseña"});
    }    
    if(password!=confirm_password){
        errors.push({text:"Contraseña Incorrecta"});
    }
    if(errors.length > 0){
        res.render('users/new-register',{
            errors,
            name,
            email
        })
    } else if (password==confirm_password)
    {   
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            errors.push({text:"El email ya está en uso"});
            res.render('users/new-register',{
                errors,
                name,
                lastname,
                email
            })
        }else{           
            //const newUser = new User({name,email,password})
            const newUser = new User({
                name	    : name ,
                provider_id    : email,
                email       : email,
                password	: password
            });

            newUser.password = await newUser.encrypPassword(password);
            await newUser.save();
            req.flash("success_msg", "Registro Satisfacctoriamente");
            res.redirect('/users/begin-session');
        }
    }
    else if(password!=confirm_password)
    {
        req.flash("error_msg", "Las contraseñas no coinciden, Verificar.");   
        res.redirect('/users/new-register');     
    }
}

userCtrl.renderBeginSesionForm = (req,res) => {
    res.render('users/begin-session');
}

userCtrl.Begin=passport.authenticate('local',{
    failureRedirect:'/users/begin-session',
    successRedirect:'/profile',
    failureFlash:true  
});

userCtrl.logout = (req,res) => {
    req.logout();
    req.flash('success_msg', 'Sesión Terminada');
    res.redirect('/users/begin-session');
}

module.exports = userCtrl;