import L from 'leaflet'
import '../src'

let map = window.map = L.map('map').setView([23.75, 120.75], 5)
L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
  layers: 'ne:ne'
}).addTo(map)

let options

if (API_ENTRY) {
  options = {
    async ajax ({ latLngBounds, coords }) {
      let xhr = new XMLHttpRequest()
      let data = {
        leftDown: `${latLngBounds.getSouth()},${latLngBounds.getWest()}`,
        rightTop: `${latLngBounds.getNorth()},${latLngBounds.getEast()}`,
        scale: coords.z,
        loc: 'JP'
      }
      let url = L.Util.template(
        API_ENTRY + '?fileName={loc}&scale={scale}&leftDown={leftDown}&rightTop={rightTop}',
        data
      )
      xhr.open('get', url)
      xhr.responseType = 'json'
      let promise = new Promise(resolve => { xhr.onload = resolve })
      xhr.send()
      await promise
      return xhr.response
    },
    radius: 5,
    blur: 8
  }
} else {
  options = {
    ajax ({ latLngBounds }) {
      return [
        [latLngBounds.getNorth(), latLngBounds.getWest(), 1]
      ]
    },
    minOpacity: 0.5
  }
}

L.gridHeat(options).addTo(map)
