$(document).ready(function(){
    if(Cookies.get('token') == null){
       window.location.replace("/login.html");
       alert('Faça login!');  //
    }
    else{
    }
})
