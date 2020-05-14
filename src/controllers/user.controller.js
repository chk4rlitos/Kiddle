
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
                password	: password,
                is_active   : 1,
                is_superuser: 0
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

userCtrl.renderListarUsuarios= async (req,res) => {
    const user = req.user;
    const usuarios = await User.find({});
    res.render('users/list-users', {user,usuarios});
}

userCtrl.renderEditarUsuarios = async (req,res) => {
    const user = req.user;
    const usuarios = await User.findById(req.params.id);  
    const modal_is_active = 1; 
    res.render('users/edit-users', {
        user,
        usuarios,
        modal_is_active
     });
                
}
userCtrl.renderEditarUsuariosForm = async (req,res) => {
    var {name,email,is_active,is_superuser} = req.body;  

    if(is_active === "on")
    {
        is_active=1;
    }
    if(is_superuser === "on")
    {
        is_superuser=1
    }    
    await User.findByIdAndUpdate(req.params.id, {name,email,is_active,is_superuser});   
    req.flash('success_msg', 'Su registro se actualizó de manera satisfacctoria.');  
    res.redirect('/users/listar-usuarios');
  }

userCtrl.renderBuscarUsuarios = async(req,res) => {
    const user = req.user;
    const condicion=req.query.condicion;
    const email = req.query.email||'';
    const nombre = req.query.nombre;
    
    if(nombre || email)
    {
        if(condicion == 'true')
        {
            const verdadero=true;
            const usuarios = await User.find({$or:[{email:email}, {name:nombre}]});
            res.render('users/list-users', {user,usuarios,email,nombre,condicion,verdadero});
        }
        else 
        {
            const falso=true;
            const usuarios = await User.find({$or:[{email:email}, {name:nombre}]});
            res.render('users/list-users', {user,usuarios,email,nombre,condicion,falso});
        }
    }
    else if (condicion)
    {
        if(condicion == 'true')
        {
            const verdadero=true;
            const usuarios = await User.find({is_active:condicion});
            res.render('users/list-users', {user,usuarios,email,nombre,condicion,verdadero});             
        }
        else
        {
            const falso=true;
            const usuarios = await User.find({is_active:condicion});
            res.render('users/list-users', {user,usuarios,email,nombre,condicion,falso});               
        }      
    }
}  
module.exports = userCtrl;