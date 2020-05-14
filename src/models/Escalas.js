const {Schema, model} = require('mongoose');

const EscalasSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    image:{
        type:String
    },
    state:{
        type:Number,
        default: 1 
    }
},{
    timestamps:true
})

EscalasSchema.methods.setImgUrl =function setImgUrl (filename){
    this.image = filename;
}

module.exports=model('Escalas',EscalasSchema);