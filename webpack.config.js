const path = require('path')
const webpack = require('webpack')
const root = __dirname

module.exports = {
  entry: ['babel-polyfill', 'index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'leaflet.gridHeat.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(root, 'src')
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
if (process.env.BUILD === 'min') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
  module.exports.output.filename = 'leaflet.gridHeat.min.js'
}
