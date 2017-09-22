
import debounce from 'lodash.debounce'

const Super = L.GridLayer
const AjaxData = Super.AjaxData = Super.extend({
  _requests: {},
  options: {
    ajax ({ coords, latLngBounds }) { return {} },
    heatLayer: {}
  },
  async createTile (coords) {
    return this.options.ajax({
      coords,
      latLngBounds: this._getTileBound(coords)
    })
  },
  _getTileBound (coords) {
    let size = this.getTileSize()
    let bounds = [coords, coords.add([1, 1])]
      .map(x => x.scaleBy(size))
      .map(x => this._map.unproject(x, coords.z))
    return L.latLngBounds(bounds)
  },
  async _addTile (coords) {
    let key = this._tileCoordsToKey(coords)
    let done
    this._requests[key] = new Promise(resolve => { done = resolve })
    let tile = await this.createTile(this._wrapCoords(coords))
    this._tiles[key] = {
      el: tile,
      coords,
      current: true
    }
    done()
    delete this._requests[key]
  },
  _update: debounce(function () {
    Super.prototype._update.apply(this, arguments)
    this._redraw()
    return this
  }, 500),
  async _redraw () {
    let heatLayer = this.options.heatLayer
    for (let promise of Object.values(this._requests)) {
      await promise
    }
    heatLayer._latlngs = []
    for (let { el } of Object.values(this._tiles)) {
      for (let d of el) {
        heatLayer._latlngs.push(d)
      }
    }
    heatLayer.redraw()
  }
})

export { AjaxData as default }
