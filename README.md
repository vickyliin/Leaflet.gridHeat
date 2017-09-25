# Leaflet.gridHeat

A heatmap plugin with data stored in tiles to get rid of large amount data transfer. Built on top of [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat).

## Usage

```javascript
L.gridHeat(options).addTo(yourMap)
```

## Reference

### options

All [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) options are available.

#### options.ajax

A function to load tile data from server.

##### ajax(params)

| Name                | Type           | Description                   |
|---------------------|----------------|-------------------------------|
| params.latLngBounds | L.LatLngBounds | LatLngBounds of the tile.     |
| params.coords       | L.Point        | xyz-coordinate of the tile.   |

##### return

List of **latLngs** to show **or** a promise resolving latLngs.  
For the format of latLngs, please refer to [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat)
