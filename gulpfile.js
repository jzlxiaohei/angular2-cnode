var path = require('path')
var gulp = require('gulp')
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

gulp.task('dev-server',function(){
    var devConfig = require('./webpack.dev.config.js')
    var server = new WebpackDevServer(webpack(devConfig),{
        hot: true,
        publicPath: devConfig.output.publicPath,
        //inline:true,
        progress:true,
        stats:{
            colors:true
        }
    })
    server.listen(9527,'localhost')
})


gulp.task('dll',function(next) {
    var dllConfig = require('./webpack.dll.config.js')
    webpack(dllConfig,function(err,stats){
        if(err){
            throw err;
        }
        var jsonStats = stats.toJson();
        var errors = jsonStats.errors
        if(errors.length > 0){
            console.log(errors.length + 'error(s), first one is:')
            throw new (errors[0]);
        }
        console.log(stats.toString({
            colors: true,
            children: false,
            chunks: false,
            modules: false
        }))

        next();
    })
})

