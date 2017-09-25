import 'leaflet.heat'
import AjaxData from 'ajax-data'

let Super = L.LayerGroup
const GridHeat = Super.GridHeat = Super.extend({
  initialize (opt) {
    let { ajax, ...heatLayerOpt } = opt
    let heatLayer = this.heatLayer = L.heatLayer([], heatLayerOpt)
    let dataLayer = this.dataLayer = new AjaxData({ ajax })
    dataLayer.on('requestsDone', ({tiles}) => this.redraw(tiles))
    Super.prototype.initialize.call(this, [dataLayer, heatLayer])
  },
  async redraw (tiles) {
    let heatLayer = this.heatLayer
    heatLayer._latlngs = []

    for (let { el } of tiles) {
      for (let d of el) {
        heatLayer._latlngs.push(d)
      }
    }
    heatLayer.redraw()
  }
})

L.gridHeat = opt => new GridHeat(opt)
export { GridHeat as default }
