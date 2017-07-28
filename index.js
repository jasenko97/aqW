var webservice = 'http://10.135.13.1:5432/places';


 // pokazivanje mape 


        $( document ).ready(function() {
          $( 'input[type=text]' ).val('');
          loadPlaces();
        });

        $( document ).on( 'click touchstart', '', function() {
            console.log ("123");
            
          $( '.aktiv' ).removeClass( 'aktiv' );
          $( this ).addClass( 'aktiv' );
          $( '.page' ).hide();
          $( $(this).attr('href') ).show();
            
            
            if ($(this).attr('href')== '#page4') {
                var map = new google.maps.Map( $('#googlemap').get(0), {
                    center:{lat:0,lng:0},
                    zoom:3
                });
                
                
               navigator.geolocation.getCurrentPosition( function( position ) {
              map.setCenter({ lat:position.coords.latitude, lng:position.coords.longitude   });
              map.setZoom(15);
            } );


          }

        });

      //ne kontam ovaj dio

    
    /*
    $.ajax({
            url:webservice,
            type:'POST',
            data:newPlace,
            success:function(d) {
              alert( 'Gespeichert.' );
              $( 'input' ).val('');
              loadPlaces();
            },
            error:function() {
              alert( 'Da ging was schief...');
            }
          });
        });

        $( document ).on( 'click', '.delPlace', function() {
          var id = $(this).parent().attr('data-id');
          $.ajax({
            url: webservice+'/'+id,
            type:'DELETE',
            success:function(d) {
              alert( 'Gelöscht.' );
              loadPlaces();
            },
            error:function() {
              alert( 'Da ging was schief...');
            }
          });
        }); */
    
    
    var directionDisplay, map;
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();
    
    function initialize() {
  // postaviti centar
  var latlng = new google.maps.LatLng(51.764696,5.526042);
  // postaviti rutu opcija
  var rendererOptions = { draggable: true };
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  // postaviti display opcije za mapu
  var myOptions = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  };
  // dodaj mpi
  map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
  // binduj mapu u smijeru
  directionsDisplay.setMap(map);
  // Usmjerite upute prema spremniku za pojedinosti o smjeru
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
  // start  geolocation API
  if (navigator.geolocation) {
    // kada je geo lokacija dostupna na tvom uredjaju , pokreni ovu funkciju
    navigator.geolocation.getCurrentPosition(foundYou, notFound);
  } else {
    // kada geo lokacija nije dostupna , alert ovu poruku
    alert('Geolocation not supported or not enabled.');
  }
}


var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsMap;
var z = document.getElementById("directions-canvas");
var start;
var end;

function getDirectionsLocation() {
	console.log("getDirectionsLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showDirectionsPosition);
    } else {
        z.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showDirectionsPosition(position) {
	console.log("showDirectionsPosition");
    directionsLatitude = position.coords.latitude;
    directionsLongitude = position.coords.longitude;
    directionsLatLng = new google.maps.LatLng(directionsLatitude,directionsLongitude);
    getDirections();
}

function getDirections() {
	console.log('getDirections');
  directionsDisplay = new google.maps.DirectionsRenderer();
  //start = new google.maps.LatLng(directionsLatLng);
  var directionsOptions = {
    zoom:12,
    center: start
  }
  directionsMap = new google.maps.Map(document.getElementById("directions-canvas"), directionsOptions);
  directionsDisplay.setMap(directionsMap);
  calcRoute();
}

function calcRoute() {
	console.log("calcRoute");
  start = directionsLatLng;
  end = "50 Rue Ste-Catherine O Montréal, QC H2X 1Z6";
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.TRANSIT
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

$( document ).on( "pageshow", "#directionsPage", function( event ) {
  getDirectionsLocation();
});








