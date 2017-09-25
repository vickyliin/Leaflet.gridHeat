const path = require('path')
const webpack = require('webpack')
const root = __dirname
const entry = 'index.js'

module.exports = {
  entry: {
    '.js': entry,
    '.min.js': entry
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'leaflet.gridHeat[name]'
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
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
}
