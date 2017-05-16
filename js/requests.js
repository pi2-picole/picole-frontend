$(document).ready(function(){

jQuery.get('https://picole-pi2.herokuapp.com/machines/1', function(data) {
    for(let i=0; i<data.stocks.length; i++){
      $('#sabor-'+ i).text(data.stocks[i].popsicle.flavor);
      $('#quantity-'+ i).val(data.stocks[i].amount);
    }
  });

  $.post("https://picole-pi2.herokuapp.com/popsicles/" ,
     	 	{
            "id": 6,
            "flavor": "POST",
            "price": "1.00",
            "is_active": true
          }

      )

})
