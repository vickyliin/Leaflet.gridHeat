import L from 'leaflet'
// import '../src'

let map = window.map = L.map('map').setView([23.75, 120.75], 13)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  maxZoom: 5,
  id: 'mapbox.streets',
  accessToken: process.env.MAPBOX_TOKEN
}).addTo(map)
