
const {Schema, model} = require('mongoose');

const MenuSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },    
    image:{
        type:String
    },
    companyId :{        
            type:Schema.Types.ObjectId,
            ref:'Company'
    },
    state:{
        type:Boolean,
        default: 1 
    }
},{
    timestamps:true
})

MenuSchema.methods.setImgUrl =function setImgUrl (filename){
    this.image = filename;
}


module.exports=model('Menu', MenuSchema);