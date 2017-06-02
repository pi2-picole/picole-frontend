$(document).ready(function(){
    console.log("Entrou");
    if(Cookies.get('token') == null){
       window.location.replace("/login.html"); 
       alert('Faça login!');  //
    }
    else{
        console.log("Null")
    }
})
