const webpack = require('webpack');
const path = require('path');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    entry: path.join(__dirname, 'build/', 'index.js'),
    output: {
        path: path.join(__dirname, 'build/', 'public', 'javascripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    node: {
      fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: 'babel_cache',
                    presets: ['es2015', 'react']
                }
    },
            {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            }
    ],
    loaders: [
        {
          test: /plugin\.css$/,
          loaders: [
            'style-loader', 'css',
          ],
        },
      ]
    },
    plugins: [
    new webpack.DefinePlugin({
            'process.env' : {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'BASE_URI': JSON.stringify(process.env.BASE_URI),
                'MapboxAccessToken': JSON.stringify(process.env.MapboxAccessToken),
            }
        })
  ],
    devtool: '#source-map'
};