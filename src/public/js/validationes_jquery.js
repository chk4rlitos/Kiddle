$(document).ready(function(){
    $('#ValidaProducto').bootstrapValidator({
        message: 'This value is not valid',     
        fields: {
            name: {
                 validators: {
                    notEmpty: {
                         message: 'Ingrese un nombre '
                     },
                     stringLength: {
                        min: 3,
                        message: 'Ingrese un nombre correcto'
                    }                                                                 
                 }
             },
             description: {
                 validators: {
                    notEmpty: {
                         message: 'Ingrese una descripción'
                     },
                     stringLength: {
                        min: 10,
                        message: 'La descripcionbe debe tener más de 10 caracteres'
                    }                     
                 }
             },
             characteristics: {
                 validators: {
                     notEmpty: {
                         message: 'Ingrese características'
                     },
                     stringLength: {
                        min: 20,
                        message: 'La descripcionbe debe tener más de 20 caracteres'
                    }                   
                 }
             },
             image :{
                 validators :{
                    file: {
                        extension: 'png,jpeg,jpg,gif',
                        type: 'image/png,image/jpeg,image/gif',
                        maxSize: 2048*1024,   // 5 MB
                        message: 'El archivo seleccionado no es válido, debe ser (.png, .jpg, .jpeg, .gif) y 5 MB como máximo.'
                  }           
                }
             }        

            
        },
    });      
    $('#ValidaEscala').bootstrapValidator({
        message: 'This value is not valid',     
        fields: {
            name: {
                 validators: {
                    notEmpty: {
                         message: 'Ingrese una escala '
                     },
                     stringLength: {
                        min: 3,
                        message: 'Ingrese una escala correcto'
                    }                                                                 
                 }
             },
             description: {
                 validators: {
                    notEmpty: {
                         message: 'Ingrese una descripción'
                     },
                     stringLength: {
                        min: 10,
                        message: 'La descripcionbe debe tener más de 10 caracteres'
                    }                     
                 }
             },
             image :{
                 validators :{
                    file: {
                        extension: 'png,jpeg,jpg,gif',
                        type: 'image/png,image/jpeg,image/gif',
                        maxSize: 2048*1024,   // 5 MB
                        message: 'El archivo seleccionado no es válido, debe ser (.png, .jpg, .jpeg, .gif) y 5 MB como máximo.'
                  }           
                }
             }        

            
        },
    });            
    $('#ValidaCompany').bootstrapValidator({
        message: 'This value is not valid',     
        fields: {
            name: {
                 validators: {
                    notEmpty: {
                         message: 'Ingrese un Nombre '
                     },
                     stringLength: {
                        min: 3,
                        message: 'Ingrese un nombre correcto'
                    }                                                                 
                 }
             },
             ruc: {
                 validators: {
                    regexp: {
                        regexp: /^[0-9_]+$/,
                        message: 'Soló deberia ingresar números'
                    },                        
                    notEmpty: {
                         message: 'Ingrese una ruc'
                     },
                     stringLength: {
                        min: 11,
                        max:11,
                        message: 'El RUC es de 11 caracteres'
                    }                     
                 }
             },
             direction: {
                validators: {
                   notEmpty: {
                        message: 'Ingrese una dirección'
                    },
                    stringLength: {
                       min: 10,
                       message: 'La direcction debe tener más de 10 caracteres'
                   }                     
                }
            },             
             image :{
                 validators :{
                    file: {
                        extension: 'png,jpeg,jpg,gif',
                        type: 'image/png,image/jpeg,image/gif',
                        maxSize: 2048*1024,   // 5 MB
                        message: 'El archivo seleccionado no es válido, debe ser (.png, .jpg, .jpeg, .gif) y 5 MB como máximo.'
                  }           
                }
             },        
        },
    });  
    $('#ValidaMenu').bootstrapValidator({
        message: 'This value is not valid',     
        fields: {
            name: {
                 validators: {
                    notEmpty: {
                         message: 'Ingrese un Nombre '
                     },
                     stringLength: {
                        min: 2,
                        message: 'Ingrese un nombre correcto'
                    }                                                                 
                 }
             },
             description: {
                 validators: {                    
                    notEmpty: {
                         message: 'Ingrese una descripción'
                     },
                     stringLength: {
                        min: 10,
                        message: 'El texto mínimo debe ser de 10 caracteres'
                    }                     
                 }
             },           
             price: {
                validators: {                    
                     regexp: {
                        regexp: /^[0-9]^\d*(\.\d{0,2})?$+$/,
                        message: 'Ingrese un precio correcto'
                    }                  
                }
            },                 
             image :{
                 validators :{
                    file: {
                        extension: 'png,jpeg,jpg,gif',
                        type: 'image/png,image/jpeg,image/gif',
                        maxSize: 2048*1024,   // 5 MB
                        message: 'El archivo seleccionado no es válido, debe ser (.png, .jpg, .jpeg, .gif) y 5 MB como máximo.'
                  }           
                }
             },        
        },
    });            

});    


    //  regexp: {
    //     regexp: /^[a-zA-Z0-9_]+$/,
    //     message: 'The username can only consist of alphabetical, number and underscore'
    // }        
    // emailAddress: {
    //     message: 'The input is not a valid email address'
    // }
    // date: {
    //     format: 'YYYY/MM/DD',
    //     message: 'The date of birth is not valid'
    // }             
    // different: {
    //     field: "email",
    //     message: "Correo electrónico y contraseña no pueden coincidir"
    //   }             
    // identical: {
    //     field: "password",
    //     message: "Contraseña y confirmación La contraseña debe coincidir"
    //   }     