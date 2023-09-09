const http = require('http');

/* First METHODS... very low level... not conventional
const server = http.createServer();
server.on('connection', (socket)=>{
    console.log('New Connection');
}); */

//Second Method
const server = http.createServer(function(req, res){
    if(req.url==='/'){
        res.write('Hello World');
        res.end();
    }
    if(req.url==='/api/courses'){
        res.write('these are the page for exercices')
        res.end();
    }
})

server.listen(8000);

console.log('Listening on port 5000...')