function BuildTableRow(obj, type) {
  console.log(type);
  var row = "<tr>"

  for (let i in obj) {
    if (i != "id")
      row += "<td>" + obj[i] + "</td>"
    else if(type == "machine")
     row += "<td>" + obj[i] + "</td>"
  }

  row += "<td>" +
    "<button type='button' " +
    "onclick='Display(this);' " +
    "class='btn btn-default'" +
    "data-id='" + obj.id + "'>" +
    "<span class='glyphicon glyphicon-edit'></span>" +
    "</button>" +
    "</td>" +
    "<td>" +
    "<button type='button' " +
    "onclick='Delete(this);' " +
    "class='btn btn-default'" +
    "data-id='" + obj.id + "'>" +
    "<span class='glyphicon glyphicon-remove'></span>" +
    "</button>" +
    "</td>" +
    "</tr>"
  return row;
}

// Flavor


function postFlavor() {

  var flavor = $('').val();
  var price = $('').val();

  return $.ajax({
    url: "https://picole-pi2.herokuapp.com/popsicles/",
    data: {
      "flavor": flavor,
      "price": price,
      "is_active": true
    },
    type: "POST",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function AddToTable(data) {
      var id = data.id;
      console.log(id);
      // Primeiro verifica se a tag <tbody> existe. Adiciona um caso não exista
      if ($("#flavorsTable tbody").length == 0) {
        $("#flavorsTable").append("<tbody></tbody>");
      }

      // Adiciona Livro na Tabela
      var popsicle = {
        flavor: flavor,
        price: price,
        id: id
      };
      $("#flavorsTable tbody").append(BuildTableRow(popsicle, "flavor"));

      alert("Picolé Cadastrado ");
      // // Incrementamos o nextId
      // _nextId += 1;
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }

    }
  });

}

function patchFlavor(_activeId) {
  var flavor = $('#flavor').val();
  var price = $('#price').val();
  price = price.replace(",", "");

  return $.ajax({
    url: "https://picole-pi2.herokuapp.com/popsicles/" + _activeId + "/",
    data: {
      "flavor": flavor,
      "price": price,
      "is_active": true
    },
    type: "PATCH",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(data) {
      var id = data.id;
      var row = $("#flavorsTable button[data-id='" + id + "']").parents("tr")[0];
      price = price.replace(/(\d{1})(\d{1,2})$/, "$1,$2");
      var popsicle = {
        flavor: flavor,
        price: price,
        id: id
      };

      $(row).after(BuildTableRow(popsicle, "flavor"));

      // Remover a linha antiga
      $(row).remove();

      // Limpar o formulário
      formClear();

      // Mudar o texto do Botão
      $("#updateButton").text("Adicionar Picolé");

      alert("Picolé atualizado!");

    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    }
  });

}

function deleteFlavor(button_delete) {
  var row = $(button_delete).parents("tr");
  var cols = row.children("td");
  _activeId = $($(cols[2]).children("button")[0]).data("id");

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/popsicles/" + _activeId + "/",
    type: "DELETE",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(data) {
      $(button_delete).parents("tr").remove();
      alert("Sabor de picolé deletado.")
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    }
  });

}

//Machine

function postMachine() {

  var label = $('#label').val();
  // var idMachine = $('#idMachine').val();
  var vendorMachine = $('#vendorMachine').val();


  return $.ajax({
    url: "https://picole-pi2.herokuapp.com/machines/",
    data: {
      "is_active": true,
      "seller": vendorMachine,
      "label": label
    },
    type: "POST",

    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(data) {
      if ($("#flavorsTable tbody").length == 0) {
        $("#flavorsTable").append("<tbody></tbody>");
      }
      var id = data.id;

      var dict = {
        label: label,
        id: id,
        seller: vendorMachine,
      };
      $("#flavorsTable tbody").append(BuildTableRow(dict, "machine"));
      alert("Máquina Cadastrada!");
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    }
  });

}

function patchMachine(_activeId) {

  var label = $('#label').val();
  // var idMachine = $('#idMachine').val();
  var vendorMachine = $('#vendorMachine').val();


  $.ajax({
    url: "https://picole-pi2.herokuapp.com/machines/" + _activeId + "/",
    data: {
      "is_active": true,
      "seller": vendorMachine,
      "label": label
    },
    type: "PATCH",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(success) {

      var row = $("#flavorsTable button[data-id='" + id + "']").parents("tr")[0];
      var id = data.id;

      var dict = {
        label: label,
        id: id,
        seller: vendorMachine,
      };
      $("#flavorsTable tbody").append(BuildTableRow(dict, "machine"));


      // Remover a linha antiga
      $(row).remove();

      // Limpar o formulário
      formClear();

      // Mudar o texto do Botão
      $("#updateButton").text("Adicionar Máquina");
      alert("Máquina Atualizada");
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    }
  });

}

function deleteMachine(button_delete) {
  var row = $(button_delete).parents("tr");
  var cols = row.children("td");
  _activeId = $($(cols[3]).children("button")[0]).data("id");
  $.ajax({
    url: "https://picole-pi2.herokuapp.com/machines/" + _activeId + "/",
    type: "DELETE",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function() {

      $(button_delete).parents("tr").remove();
      alert("Máquina Deletada");
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    }
  });

}

//Vendor

function postVendor() {

  var vendorUsername = $('#vendorUsername').val();
  var vendorPassword = $('#vendorPassword').val();
  var vendorEmail = $('#vendorEmail').val();
  var vendorMachines = $('#vendorMachines').val();

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/",
    data: {
      "password": vendorPassword,
      "username": vendorUsername,
      "email": vendorEmail,
      "machines": vendorMachines
    },
    type: "POST",

    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(data) {
      var id = data.id;
      var dict = {
        username: vendorUsername,
        email: vendorEmail,
        id: id
      };
      if ($("#flavorsTable tbody").length == 0) {
        $("#flavorsTable").append("<tbody></tbody>");
      }
      $("#flavorsTable tbody").append(BuildTableRow(dict, "vendor"));

      alert("Vendedor Cadastrado.")
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    }
  });

}

function patchVendor(_activeId) {

  var vendorUsername = $('#vendorUsername').val();
  var vendorPassword = $('#vendorPassword').val();
  var vendorEmail = $('#vendorEmail').val();
  var vendorMachines = $('#vendorMachines').val();


  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/" + _activeId + "/",
    data: {
      "password": vendorPassword,
      "username": vendorUsername,
      "email": vendorEmail,
      "machines": vendorMachines
    },
    type: "PATCH",

    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(data) {
      var id = data.id;
      var dict = {
        username: vendorUsername,
        email: vendorEmail,
        id: id
      };

      var row = $("#flavorsTable button[data-id='" + id + "']").parents("tr")[0];
      // Adiciona a linha modifica na tabela

      $(row).after(BuildTableRow(dict, "vendor"));

      // Remover a linha antiga
      $(row).remove();

      // Limpar o formulário
      formClear();

      // Mudar o texto do Botão
      $("#updateButton").text("Adicionar Vendedor");
      alert("Vendedor atualizado.");
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    }
  });

}

function deleteVendor(button_delete) {
  var row = $(button_delete).parents("tr");
  var cols = row.children("td");
  _activeId = $($(cols[2]).children("button")[0]).data("id");

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/users/" + _activeId + "/",
    type: "DELETE",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function() {
      $(button_delete).parents("tr").remove();
      alert("Vendedor deletado.")
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    }
  });

}

function login() {

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
      // var text = JSON.parse(data.responseText);
      var token = data.token;
      var type = data.is_staff;
      var id = data.id;
      if (type)
        window.location.replace("/admin.html");
      else
        window.location.replace("/vendorArea.html");

      Cookies.set("token", token);
      Cookies.set("id", id);
    },
    error: function(error) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
          alert(text[i]);
      }
    },
    complete: function(data) {

    },
  });
}
