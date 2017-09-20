const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: ['./demo/index.js'],
  output: {
    path: path.resolve(__dirname, './demo/dist'),
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
    modules: ['node_modules']
  },
  devServer: {
    port: 16888,
    contentBase: path.join(__dirname, 'demo/dist')
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'node_modules/leaflet/dist/leaflet.css' },
      { from: 'demo/index.html' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN)
      }
    })
  ]
}
