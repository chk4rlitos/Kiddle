const EscalaCtrl = {};
const fs = require('fs-extra');
const Escalas = require('../models/Escalas');
const path = require('path');


EscalaCtrl.renderEscalas = async (req,res) => {
    const user = req.user;
    const escalas = await Escalas.find({});
    res.render('escalas/list-escala', {user,escalas});
}


EscalaCtrl.renderNewEscalas = (req,res) => {
    const user = req.user;    
    const modal_is_active = 1;      
    res.render('escalas/new-escala', {user,modal_is_active});
}

EscalaCtrl.renderNewEscalasForm = async (req,res) => {

    const errors = [];    
    const EscalaValida = req.body;
    const user = req.user;
    if(EscalaValida.name.length < 3){
      errors.push({text:"Ingrese un nombre válido"});
    }    
    if(EscalaValida.description < 10){
      errors.push({text:"Ingrese una descripción válida"});
    }    
    if(EscalaValida.characteristics < 10){
      errors.push({text:"Ingrese una carácteristica válida"});
    }
    if(errors.length > 0){
      res.render('escalas/registrar-categorias',{
        errors,
        user
      })      
    } 
    else
    {
        const {name,description,image,state} = req.body;

        const newEscala= Escalas({name,description,image,state});  
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
              newEscala.setImgUrl(req.file.originalname);
              console.log(newEscala);
              console.log(image);
              await newEscala.save();  
              req.flash('success_msg', 'Su registro se hizo de manera satisfacctoria.');
              res.redirect("/escalas/listar-categorias");           
            } else {
              await fs.unlink(imageTempPath);
              req.flash("modalerror", "Solo imagenes.... Verificar archivo.");   
              res.redirect("/escalas/registrar-categorias"); 
            }            
          }
          else
          {
            await newEscala.save();  
            req.flash('success_msg', 'Su registro se hizo de manera satisfacctoria.');
            res.redirect("/escalas/listar-categorias");          
          }
    }      
}


  EscalaCtrl.renderEditarEscalas = async (req,res) => {
  const user = req.user;
  const escalas = await Escalas.findById(req.params.id); 
  const modal_is_active = 1; 
  res.render('escalas/edit-escala', {
      user,
      escalas,
      modal_is_active
   });  
}
EscalaCtrl.renderEditarEscalasForm = async (req,res) => {
  var {name,description,image,state} = req.body;  
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
          const updateEscala= Escalas({name,description,image,state});  
          updateEscala.setImgUrl(req.file.originalname);
          var {name,description,image,state} = updateEscala;            
          await Escalas.findByIdAndUpdate(req.params.id, {name,description,image,state});              
          req.flash('success_msg', 'Su registro se actualizó de manera satisfacctoria.');
          res.redirect("/escalas/listar-categorias");           
        } else {
          await fs.unlink(imageTempPath);
          req.flash("modalerror", "Solo imagenes.... Verificar archivo.");   
          res.redirect("/escalas/edit-escala/:id"); 
        }                 
  }
  else
  {
    await Escalas.findByIdAndUpdate(req.params.id, {name,description,state});   
    req.flash('success_msg', 'Su registro se actualizó de manera satisfacctoria.');  
    res.redirect('/escalas/listar-categorias');
  }
}


module.exports=EscalaCtrl;
