'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const paths = {
    CLIENT_DIR: path.resolve(__dirname, 'client/'),
    SRC_DIR: path.resolve(__dirname, 'client/src'),
    NODE_DIR: path.resolve(__dirname, 'node_modules'),
    DIST_DIR: path.resolve(__dirname, 'dist'),
    DIST_JS_DIR: path.resolve(__dirname, 'dist/js'),
    CLIENT: path.resolve(__dirname, 'client/src/services')
}

module.exports = {
    mode: 'development',
    entry: paths.CLIENT_DIR + '/routes.js',
    output: {
      filename: 'bundle.min.js',
      path: path.resolve(__dirname, paths.DIST_JS_DIR),
      publicPath: paths.DIST_JS_DIR
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
          include: [paths.SRC_DIR, paths.NODE_DIR]
        },
        {
          test: /\.(js|jsx)?$/,
          use: [{ 
              loader: 'babel-loader'
          }],
          exclude: [paths.NODE_DIR]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            { 
              loader: 'file-loader?', 
              options: {
                name: '[name].[ext]',
                outputPath: '/imgs/'
              } 
          }],
          include: paths.SRC_DIR
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
          include: paths.SRC_DIR
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      modules: [
        paths.DIST_DIR,
        paths.DIST_JS_DIR,
        paths.NODE_DIR,
        paths.SRC_DIR
      ]
    },
    target: 'electron-renderer',
    plugins: [
      new UglifyJSPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new webpack.ProvidePlugin({
        React: paths.NODE_DIR + "/react",
        "window.React": paths.NODE_DIR + "/react",
        _: paths.NODE_DIR + "/lodash",
        "window._": paths.NODE_DIR + "/lodash",
        PropTypes: paths.NODE_DIR + "/prop-types",
        "window.PropTypes": paths.NODE_DIR + "/prop-types"
      })
    ]
  };