'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: [
    './index.web.js',
    './src/scss/styles.scss',
    './node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'index.web.js'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['module:@react-native/babel-preset']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.webpack.json'
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: 'static'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/locales', to: 'locales' }
      ]
    })
  ],
};
