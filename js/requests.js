  // Flavor

  function postFlavor() {

    var flavor = $('#flavor').val();
    var price = $('#price').val();

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
      success: function(success) {},
      error: function(error) {

        var response = JSON.parse(error.responseText);

        if (response.flavor == "popsicle with this flavor already exists.") {
          alert("Picolé já cadastrado.");
        } else if (response.price == "Ensure this field has no more than 4 characters.") {
          alert("Preço não deve ter mais que quatro dígitos.")
        } else {
          alert(response);
        }
      }
    });

  }

  function patchFlavor(_activeId) {
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
      beforeSend: function(xhr) {
        var token = Cookies.get('token');
        xhr.setRequestHeader('Authorization', 'Token ' + token);
      },
      success: function() {},
      error: function(error) {
        var response = JSON.parse(error.responseText);

      }
    });

  }

  function deleteFlavor(_activeId) {
    var flavor = $('#flavor').val();
    var price = $('#price').val();

    $.ajax({
      url: "https://picole-pi2.herokuapp.com/popsicles/" + _activeId + "/",
      type: "DELETE",
      beforeSend: function(xhr) {
        var token = Cookies.get('token');
        xhr.setRequestHeader('Authorization', 'Token ' + token);
      },
      success: function(data) {},
      error: function(error) {
        alert(error.responseText);
      }
    });

  }

  //Machine

  function postMachine() {

    var label = $('#label').val();
    // var idMachine = $('#idMachine').val();
    var vendorMachine = $('#vendorMachine').val();


    $.ajax({
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
        alert(data);
      },
      error: function(error) {
        alert(error.responseText);
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
      success: function(success) {},
      error: function(error) {
        alert(error.responseText);
      }
    });

  }

  function deleteMachine(_activeId) {

    $.ajax({
      url: "https://picole-pi2.herokuapp.com/machines/" + _activeId + "/",
      type: "DELETE",
      beforeSend: function(xhr) {
        var token = Cookies.get('token');
        xhr.setRequestHeader('Authorization', 'Token ' + token);
      },
      success: function() {},
      error: function(error) {
        alert(error);
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
      success: function() {},
      error: function(erro) {
        alert(erro.responseText);
      }
    });

  }

  function patchVendor() {

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
      success: function() {},
      error: function(erro) {
        alert(erro.responseText);
      }
    });

  }

  function deleteVendor(_activeId) {

    $.ajax({
      url: "https://picole-pi2.herokuapp.com/users/" + _activeId + "/",
      type: "DELETE",
      beforeSend: function(xhr) {
        var token = Cookies.get('token');
        xhr.setRequestHeader('Authorization', 'Token ' + token);
      },
      success: function() {},
      error: function(error) {
        alert(error.responseText);
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
      error: function() {
        alert('Login/Senha não cadastrados. Tente Novamente.!');
      },
      complete: function(data) {

      },
    });
  }
