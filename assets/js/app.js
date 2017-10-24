$(document).ready(function(){
    $("#name").focus(function(){
        if($("#email").val().length == 0){
            $("#email-error").text('Email cannot be empty');
        }else{
            $("#email-error").text('');
            $('.error').show();
            var email = $("#email").val();
            
            $.ajax({
                url: "/api/get-name.php?email=" + email,
                data: {
                    format: "json",
                },
                success: function (data) {
                    $('.error').hide();
                    var data = JSON.parse(data);
                    if(data.status == "Error"){
                        $("#btnNext").prop("disabled", false);
                        $("#name").val('');
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