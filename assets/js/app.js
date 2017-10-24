$(document).ready(function(){
    $("#name").focus(function(){
        if($("#email").val().length == 0){
            console.log('email empty');
        }else{
            var email = $("#email").val();
            console.log(email);
        }
    });   
});