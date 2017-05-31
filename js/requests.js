$(document).ready(function(){

  jQuery.get('https://picole-pi2.herokuapp.com/machines/1', function(data) {
    for(let i=0; i<data.stocks.length; i++){
      $('#sabor-'+ i).text(data.stocks[i].popsicle);
      console.log(data.stocks[i].popsicle)
      $('#quantity-'+ i).val(data.stocks[i].amount);
    }

  });
})

function postStorage(){

}

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

function postVendor(){

  var vendorUsername = $('#vendorUsername').val();
  var vendorPassword = $('#passwordField').val();
  var vendorEmail = $('#vendorEmail').val();


  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/",
    data: {
      "password": vendorPassword,
      "username": vendorUsername,
      "email": vendorEmail,
      "is_staff": true,
      "is_active": true
    },
    type: "POST",
    
    beforeSend: function(xhr){
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function() { alert('Sucessoo!' ); },
    error: function() { alert('Erro!'); }
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
    success: function() { alert('Sucesso!' ); },
    error: function() { alert('Erro!'); },
    complete: function(data){
       var text = JSON.parse(data.responseText);
       var token = text.token;
       Cookies.set("token", token);

       
       console.log(token);
    },
});

  console.log("Username : " + username + password);
}
