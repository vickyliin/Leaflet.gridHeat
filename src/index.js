import 'leaflet.heat'
import AjaxData from 'ajax-data'

let Super = L.LayerGroup
const GridHeat = Super.GridHeat = Super.extend({
  initialize (opt) {
    let { ajax, ...heatLayerOpt } = opt
    let heatLayer = this.heatLayer = L.heatLayer([], heatLayerOpt)
    let dataLayer = this.dataLayer = new AjaxData({ ajax })
    dataLayer.on('requestsSent', () => this.redraw())
    Super.prototype.initialize.call(this, [dataLayer, heatLayer])
  },
  async redraw () {
    let requests = Object.values(this.dataLayer._requests)
    for (let promise of requests) await promise

    let heatLayer = this.heatLayer
    heatLayer._latlngs = []

    let tiles = Object.values(this.dataLayer._tiles)
    for (let { el } of tiles) {
      for (let d of el) {
        heatLayer._latlngs.push(d)
      }
    }
    heatLayer.redraw()
  }
})

L.gridHeat = opt => new GridHeat(opt)
