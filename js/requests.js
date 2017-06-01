$(document).ready(function(){

  jQuery.get('https://picole-pi2.herokuapp.com/machines/1', function(data) {
    for(let i=0; i<data.stocks.length; i++){
      $('#sabor-'+ i).text(data.stocks[i].popsicle);
      console.log(data.stocks[i].popsicle)
      $('#quantity-'+ i).val(data.stocks[i].amount);
    }
  });

    jQuery.get('https://picole-pi2.herokuapp.com/machines/', function(data) {


      var sel = document.getElementById('comboMachines');
      var opt = null;

      for(i = 0; i<data.length; i++) { 

        opt = document.createElement('option');
        opt.value = data[i].id;
        opt.innerHTML = data[i].id;
        sel.appendChild(opt);
      }

  });

})

function patchStorage(){

    var idMaquina = $('#comboMachines').val();
    console.log(idMaquina);

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
    error: function() { alert('Login/Senha não cadastrados. Tente Novamente.!'); },
    complete: function(data){
       
    },
});

  // console.log("Username : " + username + password);
}
