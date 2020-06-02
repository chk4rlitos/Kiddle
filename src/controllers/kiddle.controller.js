const KiddleCtrl = {};
const fs = require('fs-extra');
const Escalas = require('../models/Escalas');
const Company = require('../models/Company');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const path = require('path');


KiddleCtrl.renderListaPreviaKiddle = async (req,res) => {
    const user = req.user;
    const escalas = await Escalas.find({state:1});
    res.render('kiddle/list-kiddle-preview', {user,escalas});
}

KiddleCtrl.renderListaCompaniesxEscalasKiddle = async (req,res) => {
    const user = req.user;
    const categoria=req.params.name;
    const empresas = await Company.find({escalaId:req.params.id, state:1});
    res.render('kiddle/list-companies-escalas-kiddle',{user,empresas,categoria})
}

KiddleCtrl.renderListaMenuxCompany = async (req,res) => {
    const user = req.user;
    const empresas = req.params.name;
    const category = req.params.id;
     
    const escalas = await Escalas.aggregate([{
        $lookup:{          
          from:"companies",    
          localField:"_id",      
          foreignField:"escalaId",
          as:"company_escalas"       
                    
        }},
        { 
          $match: { "company_escalas._id":  ObjectId(req.params.id)  }  
        }//,
        // { $unwind: { path: "$company_escalas", preserveNullAndEmptyArrays: true } },                           
      ]).exec();    
    
    console.log(escalas);  
    const menu = await Menu.find({companyId:req.params.id, state:1});
    res.render('kiddle/list-kiddle-menuxcompany',{user,empresas,escalas, menu });
}

module.exports=KiddleCtrl;




