var webpack = require('webpack')

var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    entry: {
        'v-qrcode': './index.js'
    },

    output: {
        filename: isProduction ? './dist/[name].min.js' : './dist/[name].js',

        library: 'VQrcode',

        libraryTarget: 'umd'
    },

    module: {
        loaders: [
            {
                test: /\.vue$/,

                loader: 'vue'
            },

            {
                test: /\.js$/,

                exclude: /node_modules/,

                loader: 'babel'
            }
        ]
    },

    devtool: isProduction ? '' : '#source-map',

    plugins: (function () {
        return (
            isProduction
            ? [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),

                new webpack.optimize.OccurenceOrderPlugin(),

                new webpack.BannerPlugin('(c) ' + new Date().getFullYear() + ' wxp. All Rights Reserved')
            ]
            : []
            )
            .concat([])
    })()
};
