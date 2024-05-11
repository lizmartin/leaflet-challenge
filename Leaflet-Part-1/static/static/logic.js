// read in json data file samples.json
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson'
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

let quakeData;

dataPromise.then(function(data) {
    quakeData = data;
    console.log("Quake Data: ", quakeData);
    let quakeMarker = [];
    for (let i = 0; i < quakeData.features.length; i++) {
        let magnitude = quakeData.features[i].properties.mag;
        let place = quakeData.features[i].properties.place;
        let time = quakeData.features[i].properties.time;

        var coordinates = quakeData.features[i].geometry.coordinates;
        function chooseColor(depth) {
            if (depth >= 90) return'red';
            if (depth >= 70) return 'orange';
            if (depth >= 50) return 'yellow';
            if (depth >= 30) return 'green';
            else if (depth >= 10) return 'blue';
            else return 'purple';
            }

        let marker = 
        L.circle([coordinates[1], coordinates[0]], {
            opacity: .75,
            fillOpacity: 0.75,
            color: "black",
            weight: 0.5,
            fillColor: chooseColor(magnitude),
            radius: magnitude * 50000
        })
                
        marker.bindPopup("<h3>" + place + "</h3><hr><p>" + "Magnitude: " + magnitude + "</p><p>" + "Time: " + time + "</p>");
            quakeMarker.push(marker);
    }
    console.log("Quake Marker: ", quakeMarker);

    // create base layer
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attirubtion: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    // create layer group for the markers.
    var quakes = L.layerGroup(quakeMarker);

    //define map obj.
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, quakes]
    });

    //create legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = [-10, 10, 30, 50, 70, 90];
        var colors = ["purple", "blue", "green", "yellow", "orange", "red"];
        var labels = ["<10", "10-30", "30-50", "50-70", "70-90", ">90"];

        var legendInfo = "<h1>Earthquake Magnitude</h1>" + "<h3>Magnitude</h3>"
        div.innerHTML = legendInfo;
        for (var i = 0; i < limits.length; i++) {
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                limits[i] + (limits[i + 1]? "&ndash;" + limits[i + 1] + "<br>" : "+");
        }

        return div;
    };

    //add legend to map
    legend.addTo(myMap);

});