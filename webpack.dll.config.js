var webpack = require("webpack");
var path = require('path')
module.exports = {
    entry: {
        //'angular2': [
        //    // group angular2 deps into the angular2.js file
        //    'core-js',
        //    'rxjs',
        //    'zone.js',
        //    'reflect-metadata',
        //    'angular2/angular2',
        //    'angular2/core',
        //    'angular2/router',
        //    'angular2/http'
        //]
        'angular2':[
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
        ]
    },
    output: {
        path:'assets/dist',
        filename: '[name].js',
        library:'[name]_[hash]',
        libraryTarget :"var"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, './assets/dist/angular-manifest.json'),
            name: '[name]_[hash]'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            //mangle: {
            //    except: ['$', 'exports', 'require']
            //},
            mangle:false,
            compress: {
                warnings: false
            },
            output:{comments:false},
            exclude:/\.min\.js$/
        }),
    ]
}
