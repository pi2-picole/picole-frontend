$(document).ready(function(){



})

var dataLength = "";

function showCombo(){
  document.getElementById("machineStorage").style.display="";

  var id = $('#comboMachines').val();

  jQuery.get('https://picole-pi2.herokuapp.com/machines/' + id + "/", function(data) {
    for(let i=0; i<data.stocks.length; i++){

      var h2 = document.createElement('h2');
      h2.id = "flavor-" + i
      // console.log(data.stocks[i].popsicle.flavor);
      // console.log(data.stocks);
      document.getElementById('machineStorage').appendChild(h2);
      $('#flavor-'+ i).text(data.stocks[i].popsicle.flavor);

      var div = document.createElement('div');
      // div.class = 'form-group';
      div.innerHTML = '<input type="number" value="" name="quantity" class="form-control" required="required" placeholder="Quantidade"' + 'id="quantity-'+ i + '";>';

      document.getElementById("flavor-" + i).appendChild(div);
      $('#quantity-'+ i).val(data.stocks[i].amount);
    }

  document.getElementById("storageButton").style.display="";
  });
}



function patchStorage(){

    var id = $('#comboMachines').val();


    jQuery.get('https://picole-pi2.herokuapp.com/machines/' + id + "/", function(data) {

      for(let i=0; i<data.stocks.length; i++){
        var flavorId = data.stocks[i].popsicle.id;
        var flavor = $('#flavor-' + i).val();
        var quantity = $('#quantity-' + i).val();

          $.ajax({
            url: "https://picole-pi2.herokuapp.com/stock/entry/",
            data: {
              "popsicle": flavorId,
              "amount": quantity,
              "machine": id
            },
            type: "POST",
            beforeSend: function(xhr){
              var token = Cookies.get('token');
              xhr.setRequestHeader('Authorization', 'Token ' + token);},
            success: function(success) { console.log(success ); },
            error: function(error) { alert(error.responseText); }
          });

      }

  });
}


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
