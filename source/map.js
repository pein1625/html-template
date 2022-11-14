var map,
  infowindow = null,
  locations = {
    0: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 21.17087834874, lng: 105.87967561361 },
    1: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.982464487862, lng: 105.82767316221 },
    2: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.981208365697, lng: 105.86440990022 },
    3: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 21.061249642733, lng: 105.89458902936 },
    4: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.984937539113, lng: 105.84113860801 },
    5: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.864731773052, lng: 106.6659985856 },
    6: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.838287909778, lng: 106.7303006087 },
    7: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 15.992609150455, lng: 108.21211194017 },
    8: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 16.064882284402, lng: 108.21476334178 },
    9: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.597234375545, lng: 107.05657808508 },
    10: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 11.24132059611, lng: 106.63749406217 },
    11: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.99086240143, lng: 106.75214201699 },
    12: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.986492199765, lng: 106.68684724679 },
    13: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.916215523625, lng: 106.68981222276 },
    14: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.895030068339, lng: 106.72179096442 },
    15: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 13.779576286169, lng: 109.22461540951 },
    16: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.755484295043, lng: 106.92965621059 },
    17: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.679732399528, lng: 106.85374401023 },
    18: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.950457287495, lng: 106.83439737674 },
    19: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.967285137219, lng: 106.86079501227 },
    20: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 10.956474909071, lng: 106.80337321877 },
    21: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 13.97112664422, lng: 108.01906953105 },
    22: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.507436465849, lng: 106.14289726958 },
    23: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.785041755174, lng: 106.26779320791 },
    24: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.971872848002, lng: 106.47146595082 },
    25: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 14.339536227707, lng: 108.00018215659 },
    26: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 18.683506039265, lng: 105.66517353527 },
    27: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 15.127330965747, lng: 108.80231297433 },
    28: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 21.451969403718, lng: 107.75006779552 },
    29: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.941135663641, lng: 107.12183600583 },
    30: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.853274919075, lng: 104.62056744943 },
    31: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 21.31447348614, lng: 103.92209344085 },
    32: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 11.535242367132, lng: 106.00685567457 },
    33: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 20.544412809894, lng: 106.35810407542 },
    34: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 19.861179229367, lng: 105.54981338693 },
    35: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 19.83006642108, lng: 105.78457723796 },
    36: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 16.473425905679, lng: 107.56829318139 },
    37: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 16.456206520785, lng: 107.60060584732 },
    38: { title: "Cơ sở Bình Minh", phone: "0123.456.789", addr: "Số 10, ngõ 99, Định Công Hạ, Hoàng Mai, Hà Nội", lat: 21.309911797209, lng: 105.58968331676 },
  },
  defaultLocation = {
    lat: 15.9030623,
    lng: 105.8066925,
    zoom: 6,
  };

function initMap() {
  var vietnamLocation = {
    lat: 15.9030623,
    lng: 105.8066925,
    zoom: 6,
  };

  // var myLocation = {lat: 20.964733, lng: 105.826978, zoom: 15}; // Show chi tiết 1 địa chỉ
  var myLocation = defaultLocation || vietnamLocation;

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: myLocation.zoom,
    center: myLocation,
  });

  var markers = [];

  for (var key in locations) {
    markers.push(addMarker(key));
  }

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });

  var triggers = document.querySelectorAll(".js-map-goto");

  Array.from(triggers, (trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      var locationId = parseFloat(trigger.dataset.locationId) || 0;
      var location = locations[locationId];

      var activeBtns = document.querySelector(".js-map-goto.active");

      if (activeBtns) {
        activeBtns.classList.remove("active");
      }

      this.classList.add("active");

      if (!location) {
        console.log("Không tồn tại địa chỉ này!");
        return;
      }

      map.setZoom(15);
      map.panTo({
        lat: location.lat,
        lng: location.lng,
      });

      if (infowindow) {
        infowindow.close();
      }

      infowindow = new google.maps.InfoWindow({
        content: `
        <div class="map-popup">
            <div class="map-popup__title">${location.title}</div>
            ${location.addr ? `<div><strong>Địa chỉ:</strong> ${location.addr}</div>` : ``}
            ${location.phone ? `<div><strong>Điện thoại:</strong> <a href="tel:${location.phone}">${location.phone}</a></div>` : ``}
        </div>`,
      });

      infowindow.open(map, location.marker);
    });
  });

  var links = document.querySelectorAll(".js-map-goto a");
  Array.from(links, (link) => {
    link.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
}

function addMarker(key) {
  var location = locations[key];

  var marker = new google.maps.Marker({
    position: {
      lat: location.lat,
      lng: location.lng,
    },
    map,
    label: location.label || "",
  });

  // marker.infowindow = infowindow;

  google.maps.event.addListener(marker, "click", () => {
    if (infowindow) {
      infowindow.close();
    }

    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="map-popup">
          <div class="map-popup__title">${location.title}</div>
          ${location.addr ? `<div><strong>Địa chỉ:</strong> ${location.addr}</div>` : ``}
          ${location.phone ? `<div><strong>Điện thoại:</strong> <a href="tel:${location.phone}">${location.phone}</a></div>` : ``}
      </div>`,
    });

    infowindow.open(map, marker);
  });

  locations[key].marker = marker;

  return marker;
}
