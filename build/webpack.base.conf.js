'use strict'

const { join, resolve } = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})
const extractLESS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})


const styleLoaderOptions = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
}

const CACHE_LOADER = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: join(__dirname, '../node_modules/.cache'),
  },
}

const cssOptions = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
]

const cssRemOptions = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 2
    }
  },
  {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
]

const lessOptions = [
  ...cssOptions,
  {
    loader: 'less-loader',
    options: {
      sourceMap: true
    }
  }
]

const lessRemOptions = [
  ...cssRemOptions,
  {
    loader: 'less-loader',
    options: {
      sourceMap: true
    }
  }
]

const wapLoader = {
  css: ['css-hot-loader'].concat(
    ExtractTextPlugin.extract({
      use: cssRemOptions,
      publicPath: '../../',
      fallback: styleLoaderOptions
    })
  ),
  less: ['css-hot-loader'].concat(
    ExtractTextPlugin.extract({
      use: lessRemOptions,
      publicPath: '../../',
      fallback: styleLoaderOptions
    })
  )
}
const config = {
  entry: {
    app: resolve(__dirname, '../src/index.js')
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': join(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          CACHE_LOADER,
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            use: cssRemOptions,
            fallback: styleLoaderOptions
          })
        )
      },
      {
        test: /\.less$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            use: lessOptions,
            fallback: styleLoaderOptions
          })
        )
      },
      {
        test: /\.html$/,
        use: [
          CACHE_LOADER,
          {
            loader: 'html-loader',
            options: {
              root: resolve(__dirname, 'src'),
              attrs: ['img:src', 'link:href']
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/img/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    extractLESS,
    extractCSS,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../src/app.html'),
      inject: 'body',
      // favicon: './src/assets/img/favicon.ico',
      hash: true
    })
  ]
}
module.exports = config
