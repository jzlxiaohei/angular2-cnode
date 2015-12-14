const Hapi = require('hapi')

const server = new Hapi.Server();

server.connection({
    port:3123,
    host:'localhost',
    labels:'api'
})


server.register({
    register: require('h2o2')
}, function (err) {

    if (err) {console.log('Failed to load h2o2');}
});

server.route({
    method: 'GET',
    path: '/api/{param*}',
    handler: {
        proxy: {
            host: 'cnodejs.org',
            port: '443',
            protocol: 'https'
        }
    }
});

//static file server
server.register(require('inert'), function () {});
server.route({
    method:'GET',path:'/assets/{param*}',
    handler:{
        directory: {
            path: './assets',
            redirectToSlash: true
        }
    }
})

server.start(function (err) {

    if (err) {return console.error('Server start failed:', err);}
    console.log('Server started at: ' + server.info.uri);
});
