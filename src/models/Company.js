
const {Schema, model} = require('mongoose');


const CompanySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    ruc:{
        type: String,
        required:true,
        unique:true

    },
    direction:{
        type: String,
        required:true
    },    
    eboleta : {
        type:Boolean

    },
    efactura:{
        type:Boolean
    },

    image:{
        type:String
    },
    escalaId :{        
            type:Schema.Types.ObjectId,
            ref:'Escalas'
    },
    state:{
        type:Number,
        default: 1 
    }
},{
    timestamps:true
})

CompanySchema.methods.setImgUrl =function setImgUrl (filename){
    this.image = filename;
}


module.exports=model('Company', CompanySchema);