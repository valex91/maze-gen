const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/index.ts'],
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        contentBase: 'dist',
        overlay: true
    },
    devtool: 'sourcemap',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              "css-loader"
            ]
          }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
      new MiniCssExtractPlugin()
    ]
};
