const passport = require('passport');
const User= require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config=require('./config');   


passport.serializeUser((user,done) =>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
}); 



// Configuración del autenticado con Twitter
passport.use(new TwitterStrategy({
    consumerKey		 : config.twitter.key,
    consumerSecret	 : config.twitter.secret,
    callbackURL		 : '/auth/twitter/callback'
}, function(req,accessToken, refreshToken, profile, done) {
    User.findOne({provider_id: profile.id}, function(err, user) {
        if(err) throw(err);
        // Si existe en la Base de Datos, lo devuelve
        if(!err && user!= null) return done(null, user);

        // Si no existe crea un nuevo objecto usuario
        var user = new User({
            provider_id	: profile.id,
            provider	: profile.provider,
            name		: profile.displayName,
            photo		: profile.photos[0].value
        });
        //...y lo almacena en la base de datos
        user.save(function(err) {
            if(err) throw err;
            done(null, user);
        });
    });
}));


//Configuración del autenticado con Facebook
passport.use(new FacebookStrategy({
    clientID		: config.facebook.id,
    clientSecret	: config.facebook.secret,
    callbackURL	 : '/auth/facebook/callback',
    profileFields : ['id', 'emails', 'displayName', /*'provider',*/ 'photos'],
    passReqToCallback:true
}, function(req,accessToken, refreshToken, profile, done) {  
    User.findOne({provider_id: profile.id}, function(err, user) {
        if(err) throw(err);
        if(!err && user!= null) 
        {
            return done(null, user);
        }
        var user = new User({
            provider_id	: profile.id,
            provider    : profile.provider,
            email       : profile.emails[0].value,
            name		: profile.displayName,
            photo		: profile.photos[0].value
        });
        user.save(function(err) {
            if(err) throw err;
            done(null, user);
        });
    });
}));

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
}, async (email,password,done) => {
    //MAtch exists Eamils USers
    const user = await User.findOne({email});
    if(!user){
        return done(null,false,{message:"Usuario no existe"});
    }else{
        //Match Password's User
        const match = await user.MatchPassword(password);
        if(match){
            return done(null,user);
        }else{  
            return done(null,false,{message:"Contraseña Incorrecta"});
        }
    }
}));


  
