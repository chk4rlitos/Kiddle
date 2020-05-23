$(document).ready(function(){
    $("#companybutton").on("click", function(req,res){
        // $( "#ValidaCompany" ).submit(function( event ) {
        //     event.preventDefault();//Esto es para cancelar el envio         
        //     $('#myModal').modal('show');
       
        //     var username = "";
        //     alert("pasooooooooooo");
        //     if(username=="" || password==""){
        //         alert("holaaaaaaaaaaa");
        //          $('#myModal').modal('show');
        //          event.preventDefault();//Esto es para cancelar el envio
        //     }else{
        //         alert( "Los datos se enviaran!." );
        //     }  
        //   });
    })
         
    $('#menu').click(function(e){      
        e.preventDefault();
        var nuevoCSS = {'width':'100%', "transition":'all 500ms linear'};
        var cssside = {"transition":'all 800ms linear'};
        $('.container-listas').css(nuevoCSS);
        $('.sidenav-chk').css(cssside);
        $('.sidenav-chk').slideToggle("slow", function(){
            
        });        
    }) 
    $('#menudesa').click(function(e){      
        e.preventDefault();
        var nuevoCSS = {'width':'91%',"transition":'all 500ms linear'};
        var cssside = {"transition":'all 1500ms linear'};        
        $('.container-listas').css(nuevoCSS);          
        $('.sidenav-chk').css(cssside);
        $('.sidenav-chk').slideToggle("slow", function(){
        });                   
    })                  
    $('.menu li:has(ul)').click(function(e){
        e.preventDefault();

        if ($(this).hasClass('activado')){
            $(this).removeClass('activado');
            $(this).children('ul').slideUp();
        } else {
            $('.menu li ul').slideUp();
            $('.menu li').removeClass('activado');
            $(this).addClass('activado');
            $(this).children('ul').slideDown();            
        }
    });
    $('.btn-menu').click(function(){
        $('.contenedor-menu .menu').slideToggle();
    });
    $(window).resize(function(){
        if($(document).width()>450){
            $('.contenedor-menu .menu').css({'display':'block'});
            $('nav.top-nav').css({'display':'block'});
            $('.logo').css({'display':'block'});
            $('.container').css({'display':'block'});
        }

        if($(document).width()<450){
            $('.contenedor-menu .menu').css({'display':'none'});
            $('.muni li ul').slideUp();
            $('.menu li').removeClass('activado');
            $('nav.top-nav').css({'display':'none'});
            $('.logo').css({'display':'none'});     
            $('.container').css({'display':'none'}); 
        }
    });

    $('.menu li ul li a').click(function(){
        window.location.href=$(this).attr("href");
    })
});


function ModalNuevo(url){
    nuevoModal(url);
}  
function ModalEditar(url){
    editarModal(url);
}  

function ModalDelete(url){
    deleteModal(url);
}  


function nuevoModal(url){
    $('#nuevo').load(url, function(){      
        $(this).modal('show');
    })    
}
function editarModal(url){
    $('#edicion').load(url, function(){              
        $(this).modal('show');
    })
}
function deleteModal(url){
    $('#delete').load(url, function(){       
        $(this).modal('show');
    })  
}

// function validaModal (url){
//     alert(url);
//     $('#form').submit(function (e) {
//         alert("Hola como estás?");
//         if (!e.isDefaultPrevented()) {
//             alert("Hablaaaaaaaaaaaaaaaa?");            
//             $.ajax({
//                 type: "POST",
//                 url: url,
//                 data: $(this).serialize(),
//                 success: function (data)
//                 {
//                     var messageAlert = 'alert-' + data.type;
//                     var messageText = data.message;

//                     var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
//                     if (messageAlert && messageText) {
//                         $('#form').find('.messages').html(alertBox);
//                         $('#form')[0].reset();
//                     }
//                 }
//             });
//             return false;
//         }
//     })
// }


// $(function(){
//     var url = $("form").attr("action");
    
//     $("form").submit(function(e){
//         e.preventDefault();
//         var formData = $("form").serializeArray();
//         $.ajax({
//             url:url,
//             method="POST",
//             data:formData
//         })
//         .done(function(r,textStatus,xhr){
//             if(xhr.status=200){
//                 location.reload(true);
//             }
//             else{
//                 mensaje(textStatus);
//             }
//         }).fail(function (error){
//             mensaje(error.responseText);
//         })
//     });
// });

// function mensaje(){
//     $('#mensajeRespuesta').load('/partials/messages', function(){       
//         $(this).modal('show');
//     })      
// }