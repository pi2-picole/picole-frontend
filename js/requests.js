$(document).ready(function(){

  jQuery.get('https://picole-pi2.herokuapp.com/machines/1', function(data) {
    for(let i=0; i<data.stocks.length; i++){
      $('#sabor-'+ i).text(data.stocks[i].popsicle.flavor);
      $('#quantity-'+ i).val(data.stocks[i].amount);
    }

  });
})

function postStorage(){

}

function postFlavor() {

  var flavor = $('#flavor').val();
  var price = $('#price').val();

  jQuery.post("https://picole-pi2.herokuapp.com/popsicles/" ,
 	{
        "flavor": flavor,
        "price": price,
        "is_active": true
  })
}

function postMachine(){

}

function postVendor(){

}




function login(){

  var username = $('#username').val();
  var password = $('#password').val();

  jQuery.post("https://picole-pi2.herokuapp.com/popsicles/" ,
  {
    "password": password,
    "username": username,
  })

  console.log("Username : " + username + password);
}
