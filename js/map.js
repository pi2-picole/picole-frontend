var currentLocation = {}
var selectedLocation = {}

function locationsFromMachine(machine,map){
  for (var i=0; i < machine.length; i++){
    var location = {
      lat: Number(machine[i].location.latitude),
      lng: Number(machine[i].location.longitude)
    };

    var machineName = machine[i].label

    putMarkerInMap(map, location, machineName)
    createSelects(location, machineName)
    getFlavorFromMachine(machine[i].stocks)
  }
}

function putMarkerInMap(map, position, machineName){
  var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: machineName
    });
  //abre modal quando clica no marcador
  google.maps.event.addListener(marker, 'click', function() {
    $('#myModal').modal('show')
  });
}

//criar os selects dinamicamente
function createSelects(location, machineName){
  location = JSON.stringify(location)
  $('<option>').val(location).text(machineName).appendTo('#end');
}

function getFlavorFromMachine(machine){
  for(var i=0; i<machine.length; i++){
    var flavorMachine = machine[i].popsicle.flavor
    $('<span id=flavor>').val(location).text(flavorMachine).appendTo('#end');
    document.getElementById('flavor').innerHTML = flavorMachine
  }
}

//inicia o mapa
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var map = new google.maps.Map(document.getElementById('gmap'), {
    zoom: 10,
    center: {lat: -15.793879, lng: -47.882760},
  });

  directionsDisplay.setMap(map);
  $.get('https://picole-pi2.herokuapp.com/machines/', function(data) { locationsFromMachine(data,map);});

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('end').addEventListener('change', onChangeHandler);
  document.getElementById('mode').addEventListener('change', onChangeHandler);

  getCurrentLocation(map)
}

function getCurrentLocation(map){
 //seta balãozinho com a localização
  var infoWindow = new google.maps.InfoWindow({map: map});
  // Geolocalização do html 5
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      currentLocation = pos
      infoWindow.setPosition(pos);
      infoWindow.setContent('Você está aqui!');
      map.setCenter(pos);

      var marker = new google.maps.Marker({
        position: currentLocation,
        map: map,
        title:'Você está aqui'
      });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
   });
  } else {
      // Navegador não suporta location
      handleLocationError(false, infoWindow, map.getCenter());
    }
}
 
//caso não consiga pegar a localização do usuário ou ele se recuse a permitir 
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Erro, não foi possível pegar sua localizaçãoa atual' : 'Atualize o navegador para user esse recurso');
}
//calculo da rota - posicao atual até a maquina escolhida
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var destinationString = document.getElementById('end').value
  eval('var end='+destinationString)
  directionsService.route({
    origin: currentLocation,
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

