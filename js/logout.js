function logout(){
    Cookies.remove('token');
    window.location.replace("/index.html"); 
}
