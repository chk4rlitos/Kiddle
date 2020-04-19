const profileCtrl={};

// const User = require('../models/User');
//const UserFacebook = require('../models/UserFacebook');

profileCtrl.renderProfile =  async (req,res) => {
    if(req.user)
    {
        console.log(req.user);
        res.render('profile/profile', {user:req.user.toObject()} );
    }
    else
    {
        req.flash("error_msg", "Inicie sesión con las opciones de abajo.");
        res.redirect('/users/begin-session');        
    }
}

// profileCtrl.renderProfile =  async (req,res) => {
//     if(req)
//     {    
//         if(req.user)
//         {
//             res.render('profile/profile', {user:req.user.toObject()} );
//         }
//         else
//         {
//             const obj = JSON.parse(JSON.stringify(req.sessionStore.sessions[req.sessionID]));
//             const _IdUser = JSON.parse(obj).passport.user; 
//             if(_IdUser)
//             {
//                 res.render('profile/profile');
//             }    
//             else
//             {
//                 req.flash("error_msg", "No Autorizado");
//                 res.redirect('/users/begin-session');
//             }
//         }
//     }
//     else {
//         req.flash("error_msg", "No Autorizado");
//         res.redirect('/users/begin-session');
//     };
// }

module.exports = profileCtrl;