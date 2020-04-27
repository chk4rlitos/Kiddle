const profileCtrl={};



profileCtrl.renderProfile =  async (req,res) => {
    if(req.user)
    {
        res.render('profile', {user:req.user.toObject()} );
    }
    else
    {
        req.flash("error_msg", "Inicie sesión con las opciones de abajo.");
        res.redirect('/users/begin-session');        
    }
}

module.exports = profileCtrl;