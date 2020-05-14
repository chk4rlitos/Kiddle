
const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    characteristics:{
        type:String,
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

ProductSchema.methods.setImgUrl =function setImgUrl (filename){
    this.image = filename;
}

ProductSchema.virtual('uniqueId')
  .get(function () {
    return this.name.replace(path.extname(this.name), '');
  });

module.exports=model('Product',ProductSchema);