const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const server = express();

//req.body
server.use(express.urlencoded({extended: true}));
//pega arquivos statics(como css) da pasta public 
server.use(express.static('public'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5001, function(){
    console.log('server is running');
})