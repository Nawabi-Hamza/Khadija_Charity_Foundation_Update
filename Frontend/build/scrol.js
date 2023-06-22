$(document).ready(function(){
    // this is for button be hide if we scroll page then button will be show 
    $(window).scroll(function(){
        if($(this).scrollTop() > 40){
            $("#goTopButton").fadeIn()
        }else{
            $("#goTopButton").fadeOut()
        }
    });

    // This is for click on button and go to top 
    $("#goTopButton").click(function(){ 
        $("html , body").animate({scrollTop: 0} , 800)
     });
})