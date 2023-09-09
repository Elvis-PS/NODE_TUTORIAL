const logEvent = require('./logEvent');
const EventEmitter = require('events');
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

class Emitter extends EventEmitter {};
const myEmitter = new Emitter();
const PORT=process.env.PORT || 3500;

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);
    
    let filePath;
    if(req.url ==='/' || req.url === 'index.html'){
        res.statusCode === 200;
        res.setHeader('Content-Type', 'text.html');
        filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data)=>{
            res.end(data);
        })
    }
})

server.listen(3000, ()=>console.log(`Server running on port n# ${PORT}`));




/* //Here we are creating an listener with an identifier == "log" and passing a callback as argument
myEmitter.on('log', (msg)=>logEvent(msg));

setTimeout(()=>{
    //here we emit the event with identifier == 'log' captured by the listener added in myEmitter
    myEmitter.emit('log', 'Log went emitted');
}, 2000) */