var posCORRETA = {}
var saborizze = {lat: -16.254184, lng: -47.958176}
//inicia o mapa
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -15.793879, lng: -47.882760},
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);


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


       var marker1 = new google.maps.Marker({
        position: saborizze,
        map: map,
        title: 'Saborizze!'
      });

      var marker2 = new google.maps.Marker({
        position: document.getElementById('end').value,
        map: map,
        title: 'Saborizze!'
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
  directionsService.route({
    origin: posCORRETA,
    destination: document.getElementById('end').value,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
