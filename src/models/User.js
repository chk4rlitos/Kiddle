const {Schema, model} = require('mongoose');
const bycrypt = require('bcryptjs');


const UserSchema =new Schema({
    name:{
        type:String
    },   
	provider_id : { // ID que proporciona Twitter o Facebook
        type: String,
         unique: true
    }, 
	photo:  String, // Avatar o foto del usuario    
    email:{
        type:String
    },
    password:{
        type:String
    }
},{
    timestamps:true,
    toObject: {
        virtuals: true,
      },
      toJSON: {
        virtuals: true,
      },       
})



UserSchema.methods.encrypPassword = async passowrd => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(passowrd, salt);
};

UserSchema.methods.MatchPassword = async function(password){
    return await bycrypt.compare(password, this.password)
}


module.exports=model('User', UserSchema);
