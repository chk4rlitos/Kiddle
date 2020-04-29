const ProductCtl = {};
const fs = require('fs-extra');
const Product = require('../models/Product');
const path = require('path');

ProductCtl.createNewProduct = async (req,res) => {
    const errors = [];    
    const ProductValida = req.body;
    const user = req.user;
    if(ProductValida.name.length < 3){
      errors.push({text:"Ingrese un nombre válido"});
    }    
    if(ProductValida.description < 10){
      errors.push({text:"Ingrese una descripción válida"});
    }    
    if(ProductValida.characteristics < 10){
      errors.push({text:"Ingrese una carácteristica válida"});
    }
    if(errors.length > 0){
      res.render('product/new-product',{
        errors,
        user
      })      
    } 
    else
    {
        const {name,description,characteristics,image,state} = req.body;

        const newProduct = Product({name,description,characteristics,image,state});  
        if(req.file)
          {
            // Image Location
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${req.file.originalname}`);
        
            // Validate Extension
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
              // you wil need the public/temp path or this will throw an error
              await fs.rename(imageTempPath, targetPath);
              newProduct.setImgUrl(req.file.originalname);
              await newProduct.save();  
              req.flash('success_msg', 'Su registro se hizo de manera satisfacctoria.');
              res.redirect("/product/list-product");           
            } else {
              await fs.unlink(imageTempPath);
              req.flash("modalerror", "Solo imagenes.... Verificar archivo.");   
              res.redirect("/product/new-product"); 
            }            
          }
          else
          {
            await newProduct.save();  
            req.flash('success_msg', 'Su registro se hizo de manera satisfacctoria.');
            res.redirect("/product/list-product");          
          }
    }      
}

ProductCtl.renderProducts = async (req,res) => {
    const user = req.user;
    const product = await Product.find({state:1});
    res.render('product/list-product', {user,product});
}


ProductCtl.renderProductForm = (req,res) => {
    const user = req.user;    
    res.render('product/new-product', {user});
}


ProductCtl.renderUpdateProduct = async (req,res) => {
  const user = req.user;
  const product = await Product.findById(req.params.id);  
  res.render('product/edit-product', {
      user,
      product
  });
}

ProductCtl.renderUpdateProductForm = async (req,res) => {
  const {name,description,characteristics} = req.body;  
  await Product.findByIdAndUpdate(req.params.id, {name,description,characteristics});   
  req.flash('success_msg', 'Su registro se actualizó de manera satisfacctoria.');  
  res.redirect('/product/list-product');
}

ProductCtl.renderDeleteProduct = async (req,res) => {
  const user = req.user;    
  const product = await Product.findById(req.params.id);    
  res.render('product/delete-product', {user,product});
}

ProductCtl.renderDeleteProductForm = async (req,res) => {
  const state = 0;
  await Product.findByIdAndUpdate(req.params.id, {state}); 
  req.flash('success_msg', 'Producto dado de baja');       
  res.redirect("/product/list-product");  
}

module.exports=ProductCtl;

