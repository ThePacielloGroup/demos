// Lien d'évitement > Persistence de l'affichage
jQuery(document).ready(function($) {
    $("a#skip3").focus(function(){
        $(this).addClass('visible');
    });
    
    $("a#skip4").focus(function(){
        $("#arrow").addClass('visible');
    }).blur(function(){
        $("#arrow").removeClass('visible');
    });

}); 