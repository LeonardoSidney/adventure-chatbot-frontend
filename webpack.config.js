const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

module.exports = {
  mode: 'development',
  entry: './index.web.js',
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
          },
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
  ],
};
