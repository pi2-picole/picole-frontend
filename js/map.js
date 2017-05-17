var posCORRETA = {}
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
var map = new google.maps.Map(document.getElementById('gmap'), {
  zoom: 10,
  center: {lat: -15.793879, lng: -47.882760},
});


var machinesLocation = $.get('https://picole-pi2.herokuapp.com/machines/', function(data) { locationsFromMachine(data);});

function locationsFromMachine(machine){
  console.log(machine)
  for (data in machine){
    putMarkerInMap(map,data.location)
  }
}

function putMarkerInMap(map, position){
  var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: 'B'
    });

    //abre modal quando clica no marcador
  google.maps.event.addListener(marker, 'click', function() {
    $('#myModal').modal('show')
  });
return marker
}

//inicia o mapa
function initMap() {

  directionsDisplay.setMap(map);

  putMarkerInMap(map)

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

