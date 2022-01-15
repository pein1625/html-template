function initMap() {
  var vietnamLocation = {lat: 15.9030623, lng: 105.8066925, zoom: 5};
  // var myLocation = {lat: 20.964733, lng: 105.826978, zoom: 15}; // Show chi tiết 1 địa chỉ
  var myLocation = vietnamLocation; // Show map Việt Nam mặc định

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: myLocation.zoom,
    center: myLocation
  });

  // The map() method here has nothing to do with the Google Maps API.
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: location.label || ""
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  var triggers = document.querySelectorAll('.js-map-goto');

  Array.from(triggers, trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      var lat = parseFloat(trigger.dataset.lat) || 0;
      var lng = parseFloat(trigger.dataset.lng) || 0;

      if (lat && lng) {
        map.panTo({lat, lng});
      }
    });
  });
}

// Tất cả địa chỉ
var locations = [
  {lat: 20.964733, lng: 105.826978, label: ""},
  {lat: 21.0199164, lng: 105.8212975, label: ""},
  {lat: 20.9597758, lng: 105.7682562, label: ""},
  {lat: 21.0647083, lng: 105.6986183, label: ""},
  {lat: 21.0333039, lng: 105.8690839, label: ""},
  {lat: 21.0274453, lng: 105.8009188, label: ""},
];
