var path = require('path');
var webpack = require('webpack');

module.exports = {
    watch: true,

    progress: true,

    devtool: 'source-map',

    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        path.resolve(__dirname, 'src/index.js')
    ],

    output: {
        path: path.join(__dirname, 'build/'),
        publicPath: '/build/',
        filename: 'app.js',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css/,
                include: __dirname + '/src',
                loaders: ['style-loader', 'css-loader?modules&camelCase=dashes&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]']
            },
            {
                test: /\.(png|jpg|svg|eot|woff|woff2|ttf)$/,
                loader: 'file-loader?',
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.css'],
        modulesDirectories: [
            'node_modules',
            path.join(__dirname, 'src')
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
