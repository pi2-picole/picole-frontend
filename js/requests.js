$(document).ready(function(){

  jQuery.get('https://picole-pi2.herokuapp.com/machines/1', function(data) {
    for(let i=0; i<data.stocks.length; i++){
      $('#sabor-'+ i).text(data.stocks[i].popsicle);
      // console.log(data.stocks[i].popsicle)
      $('#quantity-'+ i).val(data.stocks[i].amount);
    }
  });

})

function patchStorage(){

    var idMaquina = $('#comboMachines').val();
    console.log(idMaquina);

}

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
  success: function(success) { console.log(success); },
  error: function(error) {

    var response = JSON.parse(error.responseText);

    if(response.flavor == "popsicle with this flavor already exists."){
      console.log(response.flavor);
      alert("Picolé já cadastrado.");
    }
    else if (response.price == "Ensure this field has no more than 4 characters."){
      alert("Preço não deve ter mais que quatro dígitos.")
    }
  }
});

}

function patchFlavor(_activeId) {
  console.log("Active id " + _activeId);
    var flavor = $('#flavor').val();
  var price = $('#price').val();

return $.ajax({
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

  var machineName = $('#machineName').val();
  var machineNumber = $('#machineNumber').val();

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/machines/",
    data: {
      "is_active": true,
      "label": machineName
    },
    type: "POST",

    beforeSend: function(xhr){
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function() { alert('Sucesso!' ); },
    error: function() { alert('Erro!'); }
});

}

function patchMachine(_activeId) {

  var machineName = $('#machineName').val();
  var machineNumber = $('#machineNumber').val();

$.ajax({
  url: "https://picole-pi2.herokuapp.com/machines/" + _activeId + "/",
  data: {
    "is_active": true,
    "label": machineName
  },
  type: "PATCH",
  beforeSend: function(xhr){
    var token = Cookies.get('token');
    xhr.setRequestHeader('Authorization', 'Token ' + token);},
  success: function() { alert('Sucesso!' ); },
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


function postVendor(){

  var vendorUsername = $('#vendorUsername').val();
  var vendorPassword = $('#passwordField').val();
  var vendorEmail = $('#vendorEmail').val();


  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/",
    data: {
      "password": vendorPassword,
      "username": vendorUsername
      // "email": vendorEmail,
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
    error: function() { alert('Login/Senha errados. Tente Novamente.!'); },
    complete: function(data){

    },
});

  // console.log("Username : " + username + password);
}
