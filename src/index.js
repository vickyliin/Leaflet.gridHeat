import 'leaflet.heat'
import AjaxData from 'ajax-data'

L.gridHeat = opt => {
  let { ajax, ...heatLayerOpt } = opt
  let heatLayer = L.heatLayer([], heatLayerOpt)
  let dataLayer = new AjaxData({ ajax, heatLayer })
  return L.layerGroup([dataLayer, heatLayer])
}
