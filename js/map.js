var currentLocation = {}
var selectedLocation = {}


function locationsFromMachine(machine,map){
  for (var i=0; i < machine.length; i++){
    if (machine[i].location === null || machine[i].label === "" ) {
      console.log("Há máquinas sem locations")
    }else{
      var location = {
        lat: Number(machine[i].location.lat),
        lng: Number(machine[i].location.lng)
       };
    }

    var machineName = machine[i].label
    putMarkerInMap(map, location, machine[i])
    createSelects(location, machineName)
    getFlavorFromMachine(machine[i].stocks, machineName)
  }
}

function putMarkerInMap(map, position, machine){
  var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: machine.label,
      icon: 'images/popsicle-map.png'
     });
  //abre modal quando clica no marcador
  google.maps.event.addListener(marker, 'click', function() {
    getFlavorFromMachine(machine.stocks, machine.label)
    $('#myModal').modal('show')
  });
}

//criar os selects dinamicamente
function createSelects(location, machineName){
  location = JSON.stringify(location)
  $('<option>').val(location).text(machineName).appendTo('#end');
}

//associa os sabores as suas respectivas máquinas
function getFlavorFromMachine(stocks, machineName){
  for(var i=0; i<stocks.length; i++){
    if(stocks[i].popsicle != undefined){
      var price = stocks[i].popsicle.price
      var flavorMachine = stocks[i].popsicle.flavor
      document.getElementById('flavor'+i).innerHTML = flavorMachine + ' R$ ' + formatPrice(price)
    }else{
      console.log('Nem todas as máquinas tem sabores!')
    }
  }
   document.getElementById('myModalLabel').innerHTML = machineName
}

function formatPrice(price){
  price = price.replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 2 digitos
  return price
}

//inicia o mapa
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setOptions({suppressMarkers: true})


  var map = new google.maps.Map(document.getElementById('gmap'), {
    zoom: 13,
    center: {lat: -16.003214, lng: -48.054618},
  });
  getCurrentLocation(map)
  directionsDisplay.setMap(map);
  $.get('http://localhost:8000/machines/', function(data) { locationsFromMachine(data,map);});
  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('end').addEventListener('change', onChangeHandler);
  document.getElementById('mode').addEventListener('change', onChangeHandler);

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
        title:'Você está aqui',
       icon: 'images/user-map.png'

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

