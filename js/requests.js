$(document).ready(function(){

  jQuery.get('https://picole-pi2.herokuapp.com/machines/1', function(data) {
    for(let i=0; i<data.stocks.length; i++){
      $('#sabor-'+ i).text(data.stocks[i].popsicle.flavor);
      $('#quantity-'+ i).val(data.stocks[i].amount);
    }
  });

  jQuery.post("https://picole-pi2.herokuapp.com/popsicles/" ,
 	{
        "id": 6,
        "flavor": "TRYING",
        "price": "150",
        "is_active": true
      }
  )
})


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
