import L from 'leaflet'
import '../src'

let map = window.map = L.map('map').setView([23.75, 120.75], 5)
if (process.env.MAPBOX_TOKEN) {
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: process.env.MAPBOX_TOKEN
  }).addTo(map)
} else {
  L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
    layers: 'ne:ne'
  }).addTo(map)
}

window.heatData = L.gridHeat({
  ajax ({ latLngBounds }) {
    return latLngBounds
  }
}).addTo(map)
