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

// $(document).ready(function(){

//     $('.btn-slide').click(function(){
//         $('.sidenav .contenedor-menu').slideToggle();          
//         $('.btn-slide-izquierda').css({'display':'block'});
//         $('.btn-slide').css({'display':'none'});            
//         // $('nav').removeClass('top-nav');
//         // $('nav').addClass('navbar navbar-dark bg-dark');   
//     });
// });

// $(document).ready(function(){

//     $('.btn-slide-izquierda').click(function(){
//         $('.sidenav .contenedor-menu').slideToggle('show');  
//         $('.btn-slide-izquierda').css({'display':'none'});                   
//         $('.btn-slide').css({'display':'block'});                 
//         // $('nav').removeClass('navbar navbar-dark bg-dark');
//         // $('nav').addClass('top-nav');       
       
//     });    
// });
