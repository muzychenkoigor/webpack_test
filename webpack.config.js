const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const  config = {
    splitChunks: {
      chunks: 'all',
      runtimeChunk: 'single'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]


  }

  return config
}

const filename = ext => isDev ? `[name].${ext}`: `[name].[hash].${ext}`

const cssLoaders = (extra) => {
    const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
        '@models': path.resolve(__dirname, 'src/models'),
        '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
      port: 4200,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
          minify: {
              collapseWhitespace: isProd
          },
          inject: 'body',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: filename('css')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff"|woff2|eot)$/,
                type: "asset/resource"
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
        ]
    }
}