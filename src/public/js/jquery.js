$(document).ready(function(){
    $("form").on("submit", function(event){           
        // Y se procede a hacerlo vía AJAX
        // $.ajax({
        //     url: $(this).prop("action"),
        //     type: $(this).prop("method"),
        //     data: $(this).serialize(),
        //     dataType: "json",
        // }).done(function(response){
        //     if (response.estado == "ok"){
        //         alert("El proceso fue exitoso: " + response.mensaje);
        //     }
        //     else{
        //         alert("Ha ocurrido un error: " + response.mensaje);
        //     }
        // }).fail(function(xhr, error){
        //     alert(error);
        // });       
    });

          
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

function mensaje(){
    $('#mensajeRespuesta').load('/partials/messages', function(){       
        $(this).modal('show');
    })      
}