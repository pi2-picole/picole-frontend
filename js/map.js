var posCORRETA = {}
var A = {lat: -16.254184, lng: -47.958176}
var B = {lat: -16.004690, lng: -48.074022}
var C = {lat: -16.200084, lng: -47.900176}
var D = {lat: -16.244184, lng: -47.911176}
var E = {lat: -16.234184, lng: -47.900076}
var F = {lat: -16.264184, lng: -47.967176}

//inicia o mapa
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('gmap'), {
    zoom: 10,
    center: {lat: -15.793879, lng: -47.882760},
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('end').addEventListener('change', onChangeHandler);
  document.getElementById('mode').addEventListener('change', onChangeHandler);

  //seta balãozinho com a localização
  var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            posCORRETA = pos
            infoWindow.setPosition(pos);
            infoWindow.setContent('Você está aqui!');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


       var markerA = new google.maps.Marker({
        position: A,
        map: map,
        title: 'A'
      });
        var markerB = new google.maps.Marker({
        position: B,
        map: map,
        title: 'B'
      });
        var markerC = new google.maps.Marker({
        position: C,
        map: map,
        title: 'C'
      });
        var markerD = new google.maps.Marker({
        position: D,
        map: map,
        title: 'D'
      });
        var marker = new google.maps.Marker({
        position: E,
        map: map,
        title: 'E'
      });
      var markerF = new google.maps.Marker({
        position: F,
        map: map,
        title: 'F'
      });

    google.maps.event.addListener(markerB, 'click', function() {
		  $('#myModal').modal('show')
    });
}

//caso não consiga pegar a localização do usuário ou ele se recuse a permitir 
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
}


//calcula a rota, tem que adicionar os outros tipos de travelMode
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var destinationString = document.getElementById('end').value
  eval('var end='+destinationString)
  directionsService.route({
    origin: posCORRETA,
    destination: end,
    travelMode: document.getElementById('mode').value
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

