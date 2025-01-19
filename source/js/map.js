let map;
let directionsService;
let directionsRenderer;
let infoWindows = [];

async function initMap() {
    const mapEl = document.getElementById("map");

    if (!mapEl) return;

    map = new google.maps.Map(mapEl, {
        zoom: 8,
        center: { lat: 0, lng: 0 },
        mapTypeId: google.maps.MapTypeId.SATELLITE,
    });

    directionsService = new google.maps.DirectionsService();

    // Create a DirectionsRenderer object
    directionsRenderer = new google.maps.DirectionsRenderer();
}

function drawRoute(waypoints) {
    if (directionsRenderer) {
        console.log("set map null");
        directionsRenderer.setMap(null); // Remove the route from the map
    }

    if (waypoints.length < 2) return;

    directionsRenderer.setMap(map);

    const start = waypoints.shift();
    const end = waypoints.pop();

    waypoints = waypoints.map(loc => ({ location: loc, stopover: true }));

    // Request for driving directions
    directionsService.route(
        {
            origin: start,
            destination: end,
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING, // Travel mode
            optimizeWaypoints: true,
        },
        (response, status) => {
            if (status === "OK") {
                // Render the route on the map
                directionsRenderer.setDirections(response);
            } else {
                console.error("Directions request failed due to " + status);
            }
        }
    );
}

function removeAllInfoWindows() {
    infoWindows.forEach(item => {
        item.close();
    });

    infoWindows = [];
}

function renderMarkersAndCentering(locations) {
    console.log('renderMarkersAndCentering', locations);

    const bounds = new google.maps.LatLngBounds();

    let waypoints = [];

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            map: map,
            position: {
                lat: location.lat,
                lng: location.lng,
            },
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
<div class="n-info-window__frame">
    <img src="${location.info.imageUrl}" alt="" />
</div>
<div class="n-info-window__body">
    <div class="n-info-window__icon">
        <i class="fal fa-2x fa-map-marker-alt"></i>
    </div>
    <div class="n-info-window__content">
        <h3 class="n-info-window__title">${location.info.title}</h3>
        <div class="n-info-window__desc">${location.info.description}</div>
    </div>
</div>
            `,
          });

        marker.addListener("click", () => {
            infoWindow.open(map, marker); // Gắn InfoWindow với marker
        });

        infoWindow.open(map, marker); // Gắn InfoWindow với marker

        bounds.extend(marker.getPosition());

        infoWindows.push(infoWindow);

        waypoints.push({
            lat: location.lat,
            lng: location.lng,
        });
    })

    // Fit the map's viewport to the bounds
    map.fitBounds(bounds);

    drawRoute(waypoints);
}

function renderDefaultRoutes() {
    if (window.defaultRoutes) {
        const defaultRoutesData = window.defaultRoutes.map(routeName => markersData[routeName]).filter(x => x);
        removeAllInfoWindows();
        renderMarkersAndCentering(defaultRoutesData);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(renderDefaultRoutes, 1000);

    $('.js-location-checkbox').on('change', function() {
        const checkedRoutes = [];
        let routeIds = [];
        let count = 0;

        $('.js-location-checkbox').each(function() {
            if (this.checked) {
                let relics = $(this).data('relics');

                relics = String(relics).split(',');

                routeIds = [...routeIds, ...relics];

                count++;
            }
        });

        if (count) {
            routeIds = [...new Set(routeIds)];

            routeIds.forEach(routeId => {
                const routeName = 'route_' + routeId;

                if (window.markersData[routeName]) {
                    checkedRoutes.push(window.markersData[routeName]);
                }
            })

            removeAllInfoWindows();
            renderMarkersAndCentering(checkedRoutes);
        } else {
            renderDefaultRoutes();
        }
    })
});
