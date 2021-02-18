'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const vConsolePlugin = require('vconsole-webpack-plugin')

// 是否24测试环境
const isTest = process.env.MY_ENV === 'test'

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: isTest ? 'source-map' : false,
  output: {
    publicPath: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV)
    }),
    new vConsolePlugin({ // 24环境加载vConsole
      filter: [],
      enable: isTest
    }),
    // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: resolve(__dirname, '../static'),
    //     to: 'static',
    //     ignore: ['.*']
    //   }
    // ])
  ]
})

module.exports = prodWebpackConfig
