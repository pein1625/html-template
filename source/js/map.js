let map;
let customInfoWindow;

async function initMap() {
    const mapEl = document.getElementById("map");

    if (!mapEl) return;

    map = new google.maps.Map(mapEl, {
        zoom: 8,
        center: { lat: 0, lng: 0 },
    });
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

        marker.addListener('click', () => {
            if (customInfoWindow) {
                // Close the currently open info window before opening another
                customInfoWindow.parentNode.removeChild(customInfoWindow);
            }

            // Custom HTML for the InfoWindow content with a close button
            const infoContent = document.createElement('div');
            infoContent.classList.add('n-info-window');
            infoContent.innerHTML = `
<button class="n-info-window__close" onclick="closeInfoWindow()">×</button>
<div class="n-info-window__frame">
    <img src="${location.info.imageUrl}" alt="" />
</div>
<div class="n-info-window__body">
    <div class="row g-2 align-items-center">
        <div class="col-auto">
            <i class="fal fa-2x fa-map-marker-alt"></i>
        </div>
        <div class="col">
            <h3 class="n-info-window__title">${location.info.title}</h3>
            <div class="n-info-window__desc">${location.info.description}</div>
        </div>
    </div>
</div>
            `;

            // Position the custom InfoWindow on the map
            customInfoWindow = infoContent;
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoContent);

            // Set the map to pan to the clicked marker's location
            map.panTo(marker.getPosition());

        });

        bounds.extend(marker.getPosition());
    })

    // Fit the map's viewport to the bounds
    map.fitBounds(bounds);
}

function closeInfoWindow() {
    if (customInfoWindow) {
        customInfoWindow.parentNode.removeChild(customInfoWindow);
        customInfoWindow = null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const defaultRoutesData = defaultRoutes.map(routeName => markersData[routeName]).filter(x => x);
        renderMarkersAndCentering(defaultRoutesData);
    }, 1000);

    $('.js-location-checkbox').on('change', function() {
        const checkedRoutes = [];

        $('.js-location-checkbox').each(function() {
            if (this.checked) {
                const routeName = $(this).data('route');

                if (markersData[routeName]) {
                    checkedRoutes.push(markersData[routeName]);
                }
            }
        });

        renderMarkersAndCentering(checkedRoutes);
    })
});
