import 'leaflet.heat'

L.GridLayer.AjaxData = L.GridLayer.extend({
  options: {
    ajax ({ coords, latLngBounds }) {
      return {}
    }
  },
  async createTile (coords) {
    return this.options.ajax({ coords, latLngBounds: this._getTileBound(coords) })
  },
  _getTileBound (coords) {
    let size = this.getTileSize()
    let bounds = [coords, coords.add([1, 1])]
      .map(x => x.scaleBy(size))
      .map(x => this._map.unproject(x))
    return L.latLngBounds(bounds)
  },
  async _addTile (coords) {
    let key = this._tileCoordsToKey(coords)
    let tile = await this.createTile(this._wrapCoords(coords))

    this._tiles[key] = {
      el: tile,
      coords,
      current: true
    }

    // @event tileloadstart: TileEvent
    // Fired when a tile is requested and starts loading.
    this.fire('tileloadstart', { tile, coords })
  }
})

L.gridHeat = opt => new L.GridLayer.AjaxData(opt)
