$(document).ready(function(){
    $("#name").focus(function(){
        if($("#email").val().length == 0){
            console.log('email empty');
        }else{
            var email = $("#email").val();
            
            $.ajax({
                url: "https://ajax-fetch-name-by-email-josephmtinangi.c9users.io/api/get-name.php?email=" + email,
                data: {
                    format: "json",
                },
                success: function (data) {
                    var data = JSON.parse(data);
                    if(data.status == "Error"){
                        $("#email-error").text('No user exists with that email address');
                    }else{
                        $("#email-error").text('');
                        $("#name").val(data.data.name);
                        $("#btnNext").prop("disabled", false);
                    }
                },
                error: function (error) {
                  console.log(error);  
                },                
                type: "GET",
            });
        }
    });   
});