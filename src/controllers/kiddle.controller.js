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
    if(req.session.carrito == undefined){
        req.session.carrito=[];
        console.log(req.session.carrito);
    }
     
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
    const menu = await Menu.find({companyId:req.params.id, state:1});
    res.render('kiddle/list-kiddle-menuxcompany',{user,empresas,escalas, menu});
}

KiddleCtrl.AgregarItem = async(req,res) => {
  var carrito = req.session.carrito;
  var MenuItem = await Menu.findById(req.params.menuId);
    if(MenuItem)
    {
      var position =  verificar(carrito,req.params.menuId)
      if (position == -1) {
        var datos = {
            id: MenuItem.id,
            name: MenuItem.name,
            description:MenuItem.description,
            price: MenuItem.price,            
            cantidad: 1,
            price_total: MenuItem.price,
            company: MenuItem.companyId
          };
        carrito.push(datos);
      } 
      else {
        var dato = carrito[position];
        dato.cantidad = dato.cantidad + 1;
        dato.price_total = dato.cantidad * dato.price;
        carrito[position] = dato;
      }
    }
  req.session.carrito=carrito;
  res.status(200).json(req.session.carrito);
} 

KiddleCtrl.QuitarItem = async(req,res)=>{
  var carrito = req.session.carrito;
  var menuId = req.params.menuId;
  var pos = verificar(carrito, req.params.menuId);
  var dato = carrito[pos];
  if (dato.cantidad > 1) {
      dato.cantidad = dato.cantidad - 1;
      dato.price_total = dato.cantidad * dato.price;
      carrito[pos] = dato;
      req.session.carrito = carrito;
      res.status(200).json(req.session.carrito);
  } else {
      var aux = [];
      for (var i = 0; i < carrito.length; i++) {
          var items = carrito[i];
          if (items.id != menuId) {
              aux.push(items);
          }
      }
      req.session.carrito = aux;
      res.status(200).json(req.session.carrito);
  }
}

function verificar(lista,menuId){
  var pos = -1;
  for (var i = 0; i < lista.length; i++) {
      if (lista[i].id == menuId) {
          pos = i;
          break;
      }
  }
  return pos;
}

KiddleCtrl.listarCarrito = (req,res) =>{ 
  res.status(200).json(req.session.carrito);  
}

KiddleCtrl.MostrarSolicitudesPedido = (req,res) =>{
  const user = req.user;
  const SolicitudesPedido = req.session.carrito;
  res.render('kiddle/list-kiddle-SolicitudesPedido', {user,SolicitudesPedido});  
}

module.exports=KiddleCtrl;




