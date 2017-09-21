const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const root = path.resolve(__dirname, '../')

module.exports = {
  entry: ['babel-polyfill', 'index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'build.js'
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
      __dirname
    ]
  },
  devServer: {
    port: 16888
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(root, 'node_modules/leaflet/dist/leaflet.css') },
      { from: path.resolve(__dirname, 'index.html') }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN)
      }
    })
  ]
}
