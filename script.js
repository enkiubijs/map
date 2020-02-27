var points = data;
var leafletMap = L.map('map').setView([21.028066, 105.829293], 13); // view map Ha Noi
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(leafletMap);
L.canvasLayer()
    .delegate(this) // -- if we do not inherit from L.CanvasLayer we can setup a delegate to receive events from L.CanvasLayer
    .addTo(leafletMap);
var stt = "ở đây có bệnh dịch";
var cssCircle = {
    color: 'red'
}
var cssPologon = {
    color: 'red',
    fillColor: '#000',
    // weight: 0.5,
    fillOpacity: 0.5
}
var corona = L.icon({
    iconUrl: '../src/images/corona.png', //name icon
    iconSize: [90, 50], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([21.0278, 105.8342], {
    icon: corona
}).addTo(leafletMap).bindPopup(stt);
L.marker([21.032481, 105.826600], {
    icon: corona
}).addTo(leafletMap).bindPopup(stt);
L.marker([21.03724, 105.8446], {
    icon: corona
}).addTo(leafletMap).bindPopup(stt);
L.circle([21.0278, 105.8342], 1000, cssCircle).addTo(leafletMap).bindPopup(stt);
L.polygon([
    [21.0278, 105.8342],
    [21.032481, 105.826600],
    [21.03724, 105.8446]
], cssPologon).addTo(leafletMap).bindPopup(stt);

function clickMap(e) {
    var popLocation = e.latlng;
    var popup = L.popup()
        .setLatLng(popLocation)
        .setContent(`Bạn Đã Click Địa Chỉ Có Tọa Độ ${popLocation}`)
        .openOn(leafletMap);
}
leafletMap.on('click', clickMap)
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [
            [21.0278, 105.8342],
            [21.032481, 105.826600],
            [21.03724, 105.8446]
        ]
    }
};
// L.geoJSON(geojsonFeature, {
//         style: function(Feature) {
//             return {
//                 color: 'red',
//                 icon: corona
//             }
//         }
//     })
//     .addTo(leafletMap);
function onDrawLayer(info) {
    var ctx = info.canvas.getContext('2d');
    ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
    ctx.fillStyle = "rgba(255,116,0, 0.2)";
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        if (info.bounds.contains([d[0], d[1]])) {
            dot = info.layer._map.latLngToContainerPoint([d[0], d[1]]);
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }
};