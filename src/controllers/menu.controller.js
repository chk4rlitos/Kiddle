
const menuCtrl = {};
const Menu = require('../models/Menu');
const Company = require('../models/Company');
const path = require('path');
const fs = require('fs-extra');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 


menuCtrl.renderMenu = async (req,res) => {  
    const user = req.user;  
    const empresa = await Company.findById(req.params.id);
    const menu = await Menu.aggregate([
      {$match: {companyId: ObjectId(req.params.id) }}
     ]).exec();
      console.log(menu);
      res.render('menu/list-menu', {user,empresa,menu});      
  }

menuCtrl.renderNewMenu = (req,res) => {
    const user = req.user;    
    const companyId = req.params.id 
    const modal_is_active = 1;      
    res.render('menu/new-menu', {user,modal_is_active,companyId});
}
menuCtrl.renderNewMenuForms = async (req,res) => {

  const errors = [];    
  const MenuValida = req.body;
  const user = req.user;
  if(MenuValida.name.length < 3){
    errors.push({text:"Ingrese un nombre válido"});
  }    
  if(MenuValida.description < 10){
    errors.push({text:"Ingrese una descripción válida"});
  }    
  if(errors.length > 0){
    res.render('menu/new-menu' + companyId,{
      user
    })      
  }    
  else
  {
      var {name,description,price,image,companyId} = req.body;
      var newMenu= Menu({name,description,price,image,companyId});  
      if(req.file)
        {
          // Image Location
          var imageTempPath = req.file.path;
          var ext = path.extname(req.file.originalname).toLowerCase();
          var targetPath = path.resolve(`src/public/upload/${req.file.originalname}`);
      
          // Validate Extension
          if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            // you wil need the public/temp path or this will throw an error
            await fs.rename(imageTempPath, targetPath);
            newMenu.setImgUrl(req.file.originalname);
            await newMenu.save();  
            req.flash('success_msg', 'Su registro se hizo de manera satisfacctoria.');
            res.redirect("/menu/list-menu/"+ companyId );           
          } else {
            await fs.unlink(imageTempPath);
            req.flash("modalerror", "Solo imagenes.... Verificar archivo.");   
            res.redirect("/escalas/registrar-categorias"); 
          }            
        }
        else
        {
          await newMenu.save();  
          req.flash('success_msg', 'Su registro se hizo de manera satisfacctoria.');
          res.redirect("/menu/list-menu"+ companyId);          
        }
  }      
}

menuCtrl.renderEditMenu = async (req,res) =>{
  const user = req.user;
  const menu = await Menu.findById(req.params.id); 
  const modal_is_active = 1; 
  res.render('menu/edit-menu', {
      user,
      menu,
      modal_is_active
   });  
}

menuCtrl.renderEditMenuForms = async (req,res) => {
  var {name,description,price,image,state} = req.body;  
  var companyId = req.body.companyId;
  if(state === "on")
  {
    state=1;
  }   
  if(req.file)
  {
        // Image Location
        var imageTempPath = req.file.path;
        var ext = path.extname(req.file.originalname).toLowerCase();
        var targetPath = path.resolve(`src/public/upload/${req.file.originalname}`);  
        
        // Validate Extension
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
          // you wil need the public/temp path or this will throw an error
          await fs.rename(imageTempPath, targetPath);
          const updateCompany= Menu({name,description,price,image,state} );  
          updateCompany.setImgUrl(req.file.originalname);
          var {name,description,price,image,state} = updateCompany;            
          await Menu.findByIdAndUpdate(req.params.id, {name,description,price,image,state});              
          req.flash('success_msg', 'Su registro se actualizó de manera satisfacctoria.');
          res.redirect("/menu/list-menu/" + companyId);           
        } else {
          await fs.unlink(imageTempPath);
          req.flash("modalerror", "Solo imagenes.... Verificar archivo.");   
          res.redirect("/menu/edit-menu/:id"); 
        }                 
  }
  else
  {
    await Menu.findByIdAndUpdate(req.params.id, {name,description,price,state} );   
    req.flash('success_msg', 'Su registro se actualizó de manera satisfacctoria.');  
    res.redirect('/menu/list-menu/'+companyId);
  }  
}

  module.exports=menuCtrl;