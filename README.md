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

or use url template just as tile layers:
```javascript
let url = 'http://your.data.provider/{x}/{y}/{z}'
L.gridHeat(url, options).addTo(yourMap)
```

## Reference

### url

Data in `options` and `x`, `y`, `z` of tile's xyz-coordinate would be passed to url template, eg.

```javascript
let url = 'http://your.data.provider/{x}/{y}/{z}?{someParamKey}={itsValue}'
let options = {
  someParamKey: 'key',
  itsValue: 'value'
}
// the url generated would be like:
// http://your.data.provider/229/101/8?key=value
```

### options

All [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) options are available.

| Name                   | Type           | Default | Description                                   |
|------------------------|----------------|---------|-----------------------------------------------|
| options.updateInterval | Number         | 800     | Debounce time of update in ms.                |
| options.responseType   | String         | json    | Ajax response type when using `url`.          |
| options.ajax           | Function       | ...     | A function to load tile data from server.     |

#### options.ajax

A function to load tile data from server.

##### default

A function that gets data from `url`.

##### ajax(params)

| Name                | Type           | Description                   |
|---------------------|----------------|-------------------------------|
| params.latLngBounds | L.LatLngBounds | LatLngBounds of the tile.     |
| params.coords       | L.Point        | xyz-coordinate of the tile.   |

##### return

List of **latLngs** to show **or** a promise resolving latLngs.  
For the format of latLngs, please refer to [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat).

### GridHeat

`L.gridHeat` is just an alias of `new L.LayerGroup.GridHeat`, which is an extension of `L.LayerGroup`:

| Name                | Type                 | Description                                                     |
|---------------------|----------------------|-----------------------------------------------------------------|
| gridHeat.heatLayer  | L.HeatLayer          | The heat layer displaying data.                                 |
| gridHeat.dataLayer  | L.GridLayer.AjaxData | A layer with data stored in tiles, extended from `L.GridLayer`. |

One can accesses and manipulates the layers directly by these APIs.
