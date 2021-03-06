$(document).ready(function() {
  var id = Cookies.get('id');
  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/" + id + "/",
    type: "GET",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(data) {
      var sel = document.getElementById('comboMachines');
      var opt = null;
      for (let i = 0; i < data.machines.length; i++) {
        opt = document.createElement('option');
        opt.value = data.machines[i];
        opt.innerHTML = data.machines[i];
        sel.appendChild(opt);
      }
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
})

var dataLength = "";

function showCombo() {
  document.getElementById("machineStorage").style.display = "";

  var id = $('#comboMachines').val();

  jQuery.get('https://picole-pi2.herokuapp.com/machines/' + id + "/", function(data) {
    for (let i = 0; i < data.stocks.length; i++) {

      var h2 = document.createElement('h2');
      h2.id = "flavor-" + i

      document.getElementById('machineStorage').appendChild(h2);
      $('#flavor-' + i).text(data.stocks[i].popsicle.flavor);

      var div = document.createElement('div');
      // div.class = 'form-group';
      div.innerHTML = '<input type="number" value="" name="quantity" class="form-control" required="required" placeholder="Quantidade"' + 'id="quantity-' + i + '";>';

      document.getElementById("flavor-" + i).appendChild(div);
      $('#quantity-' + i).val(data.stocks[i].amount);
    }

    document.getElementById("storageButton").style.display = "";
  });
}



function patchStorage() {

  var id = $('#comboMachines').val();

  jQuery.get('https://picole-pi2.herokuapp.com/machines/' + id + "/", function(data) {
    var lastStorage = data;
    for (let i = 0; i < data.stocks.length; i++) {
      var flavorId = data.stocks[i].popsicle.id;

      var flavor = $('#flavor-' + i).val();
      var quantity = $('#quantity-' + i).val();

      if (quantity > data.stocks[i].amount) {
        var realQuantity = quantity - data.stocks[i].amount;
        $.ajax({
          url: "https://picole-pi2.herokuapp.com/stock/entry/",
          data: {
            "popsicle": flavorId,
            "amount": realQuantity,
            "machine": id
          },
          type: "POST",
          beforeSend: function(xhr) {
            var token = Cookies.get('token');
            xhr.setRequestHeader('Authorization', 'Token ' + token);
          },
          success: function(success) {},
          error: function(error) {}
        });
      } else if (quantity < data.stocks[i].amount) {

        var realQuantityDecrease = data.stocks[i].amount - quantity;
        $.ajax({
          url: "https://picole-pi2.herokuapp.com/stock/removal/",
          data: {
            "popsicle": flavorId,
            "amount": realQuantityDecrease,
            "machine": id
          },
          type: "POST",
          beforeSend: function(xhr) {
            var token = Cookies.get('token');
            xhr.setRequestHeader('Authorization', 'Token ' + token);
          },
          success: function(success) {},
          error: function(error) {
            alert(error.responseText);
          }
        });
      } else if (quantity == data.stocks[i].amount) {
        console.log("Igual");
      } else {
        console.log("Outro Caso");
      }


    }
  });
}
