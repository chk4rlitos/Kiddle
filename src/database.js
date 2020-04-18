const mongoose = require('mongoose');

const {KIDDLE_MONGODB_HOST, KIDDLE_MONGODB_DATABASE} = process.env;
const MONGODB_URI=`mongodb://${KIDDLE_MONGODB_HOST}/${KIDDLE_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true
})
    .then(db => console.log('Database KIDDLE is Connect'))
    .catch(err => console.log(err));