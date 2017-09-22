import 'leaflet.heat'
import AjaxData from 'ajax-data'

async function redraw (heatLayer, { requests, tiles }) {
  for (let promise of Object.values(requests)) {
    await promise
  }
  heatLayer._latlngs = []
  for (let { el } of Object.values(tiles)) {
    for (let d of el) {
      heatLayer._latlngs.push(d)
    }
  }
  heatLayer.redraw()
}

L.gridHeat = opt => {
  let { ajax, ...heatLayerOpt } = opt
  let heatLayer = L.heatLayer([], heatLayerOpt)
  let dataLayer = new AjaxData({ ajax })
  dataLayer.on('requestsSent', e => redraw(heatLayer, e))
  return L.layerGroup([dataLayer, heatLayer])
}
