let map;
let infoWindows = [];

async function initMap() {
    const mapEl = document.getElementById("map");

    if (!mapEl) return;

    map = new google.maps.Map(mapEl, {
        zoom: 8,
        center: { lat: 0, lng: 0 },
        mapTypeId: google.maps.MapTypeId.SATELLITE,
    });
}

function removeAllInfoWindows() {
    infoWindows.forEach(item => {
        item.close();
    });

    infoWindows = [];
}

function renderMarkersAndCentering(locations) {
    const bounds = new google.maps.LatLngBounds();

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
    })

    // Fit the map's viewport to the bounds
    map.fitBounds(bounds);
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
