# Leaflet.gridHeat

A heatmap plugin with data stored in tiles to get rid of large amount data transfer. Built on top of [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat).

## Demo

- [Codepen](https://codepen.io/vickyliin/pen/qPqvBd)

  This is a demo of randomly generated data. Data points are generated as tiles loaded, so it is expected for the heatmap changes each time you zoom/move the map.

## Installation

You can import the script after leaflet in your html file:
```html
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.gridheat@latest/dist/leaflet.gridHeat.min.js"></script>
```

Or use npm
```
npm install leaflet.gridheat leaflet --save
```

And import/require it after leaflet

```javascript
const L = require('leaflet')
require('leaflet.gridheat')
```

```javascript
import L from 'leaflet'
import 'leaflet.gridheat'
```

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
For the format of latLngs, please refer to [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat).
