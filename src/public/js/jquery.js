$(document).ready(function(){
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
    $('#nuevo').load(url, function(){       
        $(this).modal('show');
    })    
}  

function ModalEditar(url){
    $('#edicion').load(url, function(){       
        $(this).modal('show');
    })
}  

function ModalDelete(url){
    $('#delete').load(url, function(){       
        $(this).modal('show');
    })
}  
