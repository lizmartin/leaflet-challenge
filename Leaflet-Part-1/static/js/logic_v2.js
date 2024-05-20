// Create a map object (ref - https://leafletjs.com/examples/choropleth/)
let eqMap = L.map("map", {
    center: [37.09, -95.71], //coordinates for US
    zoom: 5,
});

// Add tile layer (ref - https://leafletjs.com/examples/choropleth/)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(eqMap);

// Load the USGS data for earthquakes in the past 7 days
let quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get data with D3 and pass response to createFeatures function.
d3.json(quakeData).then(function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Help from https://leafletjs.com/examples/choropleth/
    function getColor(d) {
        return d > 90 ? '#0c2c84' :
               d > 70 ? '#225ea8' :
               d > 50 ? '#1d91c0' :
               d > 30 ? '#41b6c4' :
               d > 10 ? '#7fcdbb' :
               d > -10 ? '#c7e9b4' :
                '#ffffcc' ;
    }

    // Use onEachFeature function for each feature in an array.
    // Popup for each feature includes earthquake magnitude, location and depth
    function onEachFeature(feature, layer) {
        layer.bindTooltip(`<strong>Located ${feature.properties.place}</strong><br>
        Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]}`);
    }

    // Change the markers to circles
    function pointToLayer(feature, latlng) {
        // Circle marker properties
        let eqMarkerOption = {
            radius: feature.properties.mag**2,
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 1,
            color: "#000",
            weight: 1
        };
        return L.circleMarker(latlng, eqMarkerOption);
    }

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer
    }).addTo(eqMap);
}
