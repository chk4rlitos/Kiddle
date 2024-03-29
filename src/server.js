const express = require('express');
const multer  = require('multer');

const exphbs = require('express-handlebars') 
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const methodOverride =require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Initializations
const app = express();


//Settings
app.set('port', process.env.PORT || 4040);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'base',
    helpers: require('./helpers/handlebars_help'),    
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname : '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares



app.use(morgan('dev'));
//app.use(express.urlencoded({extended:false}));

app.use(multer({dest: path.join(__dirname, './public/upload')}).single('image'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'));
app.use(session({ 
    secret:'secret',
    resave:true,
    saveUninitialized:true,
    cookie: {
        expires: false,
        secure: false
    }    
}));
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req,res,next) => {
    res.locals.success_msg=req.flash("success_msg");
    res.locals.error_msg=req.flash("error_msg");    
    res.locals.error=req.flash("error");
    res.locals.user=req.user||null;
    res.locals.user=req.userfb||null;
    res.locals.carrito=undefined;
    next();
});


// app.use('/public',express.static(`${__dirname}/public/upload`));

//Routes
app.use(require('./routes/home.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/profile.routes'));
app.use(require('./routes/facebook.routes'));
app.use(require('./routes/twitter.routes'));
app.use(require('./routes/product.routes'));
app.use(require('./routes/admin.routes'));
app.use(require('./routes/google.routes'));
app.use(require('./routes/escalas.routes'));
app.use(require('./routes/company.routes'));
app.use(require('./routes/menu.routes'));
app.use(require('./routes/kiddle.routes'));


//Static_Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
