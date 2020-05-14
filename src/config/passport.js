const passport = require('passport');
const User= require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const config=require('./config');   


passport.serializeUser((user,done) =>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
}); 


passport.use(new GoogleStrategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: "/auth/google/callback"
}, 
async function(accessToken, refreshToken, profile,done)   {
    await User.findOne({provider_id: profile.id}, async function (err, user) {
        if(err) throw(err);
        // Si existe en la Base de Datos, lo devuelve
        if(!err && user!= null)
        {
            return done(null, user);
        }
        else{
            // const SuperUser = await User.find({is_superuser:1,is_active:1}).count();
            const SuperUser = await User.countDocuments({is_superuser:1,is_active:1});            
            if(SuperUser === 1)
            {           
                return done(null,null,user); //,{message:"Usuario cuenta con SuperUser Logeado desde Google."});
                // return done(null,false,{message:"Usuario Inactivo, Coordinar con el Admin."});                
            }
            var userData = new User({
                        provider_id : profile.id,
                        name	    : profile.displayName,
                        email		: profile.emails[0].value,
                        photo       : profile._json.picture,
                        is_active   : 1,
                        is_superuser: 1                    
                    });
                    userData.save(function(err) {
                        if(err) throw err;
                        done(null, userData);
                    });                
            }
      });
    }
));


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
            photo		: profile.photos[0].value,
            is_active : 1,
            is_superuser:0
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
            photo		: profile.photos[0].value,
            is_active   : 1,
            is_superuser : 0
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

        //User is Active?
        if(!user.is_active)
        {
            return done(null,false,{message:"Usuario Inactivo, Coordinar con el Admin."});
        }

        //Match Password's User
        const match = await user.MatchPassword(password);
        if(match){
            return done(null,user);
        }else{  
            return done(null,false,{message:"Contraseña Incorrecta"});
        }
    }
}));


  
