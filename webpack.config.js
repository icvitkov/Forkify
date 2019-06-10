const path = require('path');
<<<<<<< HEAD
const HtmlWebpackPlugin = require('html-webpack-plugin');
=======
const HtmlWebpackPlugin = require('html-webpack-plugin')
>>>>>>> test

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
<<<<<<< HEAD
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
=======
        new HtmlWebpackPlugin ({
         filename: 'index.html',
         template: './src/index.html'   
        })
    ]
};
>>>>>>> test
