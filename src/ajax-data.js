
import debounce from 'lodash.debounce'

let Super = L.GridLayer
const AjaxData = Super.AjaxData = Super.extend({
  _requests: {},
  options: {
    ajax ({ coords, latLngBounds }) { return {} },
    updateInterval: 800
  },
  initialize () {
    Super.prototype.initialize.apply(this, arguments)
    this._update = debounce(this._update, this.options.updateInterval)
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
  _update () {
    Super.prototype._update.apply(this, arguments)
    this.fire('requestsSent', { requests: this._requests })
    this._waitAndFire(Object.values(this._requests))
    return this
  },
  async _waitAndFire (requests) {
    for (let promise of requests) await promise
    this.fire('requestsDone', { tiles: Object.values(this._tiles) })
  }
})

L.ajaxData = opt => new AjaxData(opt)
export { AjaxData as default }
