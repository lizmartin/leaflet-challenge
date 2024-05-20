//Code for creating legend in the logic.js file. Pulled out since suspected it is why the map will not render
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
          '<div class="color-box" style="background-color:' + colors[i] + '"></div>' +
          '<span>' + labels[i] + '</span><br>';


    for (var i = 0; i < limits.length; i++) {
        div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            limits[i] + (limits[i + 1]? "&ndash;" + limits[i + 1] + "<br>" : "+");
    }

    return div;
};

//add legend to map
legend.addTo(myMap);
}
