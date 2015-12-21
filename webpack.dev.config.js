var webpack = require("webpack");
var path = require('path')
module.exports =

{
    entry: {

        'angular2': [
            // group angular2 deps into the angular2.js file
            'es6-promise',
            'es6-shim',
            'reflect-metadata',
            'zone.js/dist/zone-microtask',
            'zone.js/dist/long-stack-trace-zone',
            //'zone.js',
            'angular2/platform/browser',
            'angular2/platform/common_dom',
            'angular2/core',
            'angular2/router',
            'angular2/http',
            'rxjs'
        ],
        app: [
            //'webpack/hot/only-dev-server',
            'webpack-dev-server/client?http://0.0.0.0:9528',
            'webpack/hot/dev-server',
            //'webpack/hot/only-dev-server',
            './assets/src/app.entry.js']
    },
    cache: true,

    verbose: true,
    //resolve: {
    //    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
    //},
    output: {
        path: path.join(__dirname, './assets/dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[name].js',
        publicPath: 'http://localhost:9528/'
    },

    module: {
        loaders: [
            // Support for .ts files.
            {
                test: /[\.jsx|\.js ]$/,
                exclude: /node_modules/,
                loaders: ["babel-loader?stage=0&optional[]=runtime"]
            },
            //{
            //    test: /\.ts$/,
            //    loader: 'awesome-typescript-loader',
            //    exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
            //},
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            { test: /\.html$/,  loader: 'raw' },
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader'}
        ]
    },
    debug: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.SourceMapDevToolPlugin(
            '[file].map', null,
            "[absolute-resource-path]", "[absolute-resource-path]"),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./assets/dist/angular-manifest.json'),
            sourceType:'var'
        })
    ]
}