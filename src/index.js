import simpleheat from 'simpleheat'

const GridHeat = L.GridLayer.Heat = L.GridLayer.extend({
  createTile: function (coords) {
    let tile = L.DomUtil.create('canvas', 'leaflet-tile')
    let size = this.getTileSize()
    tile.width = size.x
    tile.height = size.y
    // get a canvas context and draw something on it using coords.x, coords.y and coords.z
    // let ctx = tile.getContext('2d')
    simpleheat(tile)
    // return the tile so it can be rendered on screen
    return tile
  }
})

L.gridHeat = function (opt) {
  let { ajax, ...layerOpt } = opt
  let gridHeat = new GridHeat(layerOpt)
  gridHeat._ajax = ajax
  return gridHeat
}

export { GridHeat as default }
