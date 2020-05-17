
const companyCtrl = {};
const Company = require('../models/Company');
const Escalas = require('../models/Escalas');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const path = require('path');
const fs = require('fs-extra');


companyCtrl.renderCompany = async (req,res) => {
    const user = req.user;
    await Company.aggregate([{
        $lookup:{          
          from:"escalas",
          foreignField:"_id",
          as:"company_escalas",
          localField:"escalaId",      
        }
      }]).exec (async function(err,company){
          res.render('company/list-company', {user,company});            
      });
  }
    


companyCtrl.renderNewCompany = async (req,res) => {
    const user = req.user;    
    const escalasNew = await Escalas.find({state:1});  
    const modal_is_active = 1;      
    res.render('company/new-company', {user,modal_is_active,escalasNew});
}




companyCtrl.renderNewCompanyForms = async (req,res) => {

    const errors = [];    
    const CompanyValida = req.body;
    const user = req.user;
    if(CompanyValida.name.length < 3){
      errors.push({text:"Ingrese un nombre válido"});
    }    
    if(CompanyValida.description < 10){
      errors.push({text:"Ingrese una descripción válida"});
    }    
    if(CompanyValida.ruc.length != 11){
      errors.push({text:"Ingrese un ruc válida"});
    }
    if(errors.length > 0){
      res.render('company/new-company',{
        errors,
        user
      })      
    } 
    else
    {
        var {name,ruc,direction,image,escalaId,state} = req.body;
        const newCompany = Company({name,ruc,direction,image,escalaId,state});  
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
              newCompany.setImgUrl(req.file.originalname);
              await newCompany.save();  
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
            await newCompany.save();  
            req.flash('success_msg', 'Su registro se hizo de manera satisfacctoria.');
            res.redirect("/company/list-company");          
          }
    }      
}


companyCtrl.renderEditarCompany = async (req,res) => {
    const user = req.user;
    const modal_is_active=1;
    const comp = await Company.aggregate([
    {$match: {_id: ObjectId(req.params.id) }}, 
    {$lookup:{      
        from:"escalas",
        localField:"escalaId",                        
        foreignField:"_id",
        as:"company_escalas",
      }
    }
    ]).exec();
    var company = comp[0];
    var escalaSelected = company.escalaId;
    const escalasAll = await Escalas.aggregate([
        {$match: {state: 1} },     
        { $addFields : {
          category : escalaSelected
        }}
    ]).exec();  

    res.render('company/edit-company', { 
      user,
      company,
      escalasAll,
      modal_is_active
  });     
}

companyCtrl.renderEditarCompanyForm = async (req,res) => {
  var {name,ruc,direction,image,escalaId,state} = req.body;  
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
          const updateCompany= Company({name,ruc,direction,image,escalaId,state} );  
          updateCompany.setImgUrl(req.file.originalname);
          var {name,ruc,direction,image,escalaId,state} = updateCompany;            
          await Company.findByIdAndUpdate(req.params.id, {name,ruc,direction,image,escalaId,state});              
          req.flash('success_msg', 'Su registro se actualizó de manera satisfacctoria.');
          res.redirect("/company/list-company");           
        } else {
          await fs.unlink(imageTempPath);
          req.flash("modalerror", "Solo imagenes.... Verificar archivo.");   
          res.redirect("/company/edit-company/:id"); 
        }                 
  }
  else
  {
    await Company.findByIdAndUpdate(req.params.id, {name,ruc,direction,image,escalaId,state} );   
    req.flash('success_msg', 'Su registro se actualizó de manera satisfacctoria.');  
    res.redirect('/company/list-company');
  }
}


module.exports=companyCtrl;