
// Flavor

function postFlavor() {

  var flavor = $('#flavor').val();
  var price = $('#price').val();

$.ajax({
  url: "https://picole-pi2.herokuapp.com/popsicles/",
  data: {
    "flavor": flavor,
    "price": price,
    "is_active": true
  },
  type: "POST",
  beforeSend: function(xhr){
    var token = Cookies.get('token');
    xhr.setRequestHeader('Authorization', 'Token ' + token);},
  success: function() { alert('Sucesso!' ); },
  error: function() { alert('Erro!'); }
});

}

function patchFlavor(_activeId) {
  console.log("Active id " + _activeId);
    var flavor = $('#flavor').val();
  var price = $('#price').val();

$.ajax({
  url: "https://picole-pi2.herokuapp.com/popsicles/" + _activeId + "/",
  data: {
    "flavor": flavor,
    "price": price,
    "is_active": true
  },
  type: "PATCH",
  beforeSend: function(xhr){
    var token = Cookies.get('token');
    xhr.setRequestHeader('Authorization', 'Token ' + token);},
  success: function() { alert('Sucesso!' ); },
  error: function(error) { alert(error); }
});

}

function deleteFlavor(_activeId) {
  console.log("Active id " + _activeId);
    var flavor = $('#flavor').val();
  var price = $('#price').val();

$.ajax({
  url: "https://picole-pi2.herokuapp.com/popsicles/" + _activeId + "/deactivate/",
  type: "DELETE",
  beforeSend: function(xhr){
    var token = Cookies.get('token');
    xhr.setRequestHeader('Authorization', 'Token ' + token);},
  success: function() { alert('Sucesso!' ); },
  error: function(error) { alert(error); }
});

}

//Machine

function postMachine(){

  var label = $('#label').val();
  var idMachine = $('#idMachine').val();

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/machines/",
    data: {
      "is_active": true,
      "label": label
    },
    type: "POST",

    beforeSend: function(xhr){
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(data) { alert(data); },
    error: function(error) { alert(error.responseText); }
});

}

function patchMachine(_activeId) {

  var label = $('#label').val();
  var idMachine = $('#idMachine').val();

$.ajax({
  url: "https://picole-pi2.herokuapp.com/machines/" + _activeId + "/",
  data: {
    "is_active": true,
    "label": label
  },
  type: "PATCH",
  beforeSend: function(xhr){
    var token = Cookies.get('token');
    xhr.setRequestHeader('Authorization', 'Token ' + token);},
  success: function(success) { alert(success); },
  error: function(error) { alert(error.responseText); }
});

}

function deleteMachine(_activeId) {

$.ajax({
  url: "https://picole-pi2.herokuapp.com/machines/" + _activeId + "/deactivate/",
  type: "DELETE",
  beforeSend: function(xhr){
    var token = Cookies.get('token');
    xhr.setRequestHeader('Authorization', 'Token ' + token);},
  success: function() { alert('Sucesso!' ); },
  error: function(error) { alert(error); }
});

}

//Vendor
function getVendor(lastID){


}

function postVendor(){

  var vendorUsername = $('#vendorUsername').val();
  var vendorPassword = $('#vendorPassword').val();
  var vendorEmail = $('#vendorEmail').val();


  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/",
    data: {
      "password": vendorPassword,
      "username": vendorUsername,
      "email": vendorEmail,
    },
    type: "POST",

    beforeSend: function(xhr){
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function() { alert('Sucesso!' ); },
    error: function(erro) { alert('Erro!');
  console.log(erro);}
});

}

function patchVendor(){

  var vendorUsername = $('#vendorUsername').val();
  var vendorPassword = $('#vendorPassword').val();
  var vendorEmail = $('#vendorEmail').val();


  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/" + _activeId + "/",
    data: {
      "password": vendorPassword,
      "username": vendorUsername,
      "email": vendorEmail,
    },
    type: "PATCH",

    beforeSend: function(xhr){
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function() { alert('Sucesso!' ); },
    error: function(erro) { alert('Erro!');
  console.log(erro);}
});

}

function deleteVendor(_activeId) {

$.ajax({
  url: "https://picole-pi2.herokuapp.com/users/" + _activeId + "/",
  type: "DELETE",
  beforeSend: function(xhr){
    var token = Cookies.get('token');
    xhr.setRequestHeader('Authorization', 'Token ' + token);},
  success: function() { alert('Sucesso!' ); },
  error: function(error) { alert(error); }
});

}

function login(){

  var username = $('#username').val();
  var password = $('#password').val();

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/login/",
    data: {
      "password": password,
      "username": username
    },
    type: "POST",


    success: function(data) {
      alert('Sucesso!' );
      console.log(data)
      // var text = JSON.parse(data.responseText);
       var token = data.token;
       var type = data.is_staff;
       if(type)
          window.location.replace("/admin.html");
      else
          window.location.replace("/vendorArea.html");

       Cookies.set("token", token);
       console.log(text);
    },
    error: function() { alert('Login/Senha não cadastrados. Tente Novamente.!'); },
    complete: function(data){

    },
});

  // console.log("Username : " + username + password);
}
