const logEvent = require('./logEvent');
const EventEmitter = require('events');
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

class Emitter extends EventEmitter {};
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName)=>logEvent(msg, fileName));

const PORT=process.env.PORT || 3000;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf-8" : ""
    );
    const data =
      contentType === "appication/json" ? JSON.parse(rawData) : rawData;

    response.writeHead(filePath.includes('404.html')?404:200, { "Content-Type": contentType });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const extension = path.extname(req.url);

    switch(extension){
        case '.css':
            contentType = 'text/css'; break;
        case '.js': 
            contentType = 'text/javascript'; break;
        case '.json':
            contentType = 'application/json'; break;
        case '.jpeg':
            contentType = 'image/jpeg'; break;
        case '.png':
            contentType = 'image/png'; break;
        case '.txt':
            contentType = 'text/plain'; break;
        default:
            contentType = 'text/html';
    }

    let filePath =
      contentType === "text/html" && req.url === "/"
        ? path.join(__dirname, "views", "index.html")
        : contentType === "text/html" && req.url.slice(-1) === "/"
        ? path.join(__dirname, "views", req.url, "index.html")
        : contentType === "text/html"
        ? path.join(__dirname, "views", req.url)
        : path.join(__dirname, req.url);

    //Makes the html extension not required in the browser
    if(!extension && req.url.slice(-1)!=='/')filePath+='.html';

    const fileExists = fs.existsSync(filePath);
    if(fileExists){
        // serve file
        serveFile(filePath, contentType, res);
    }else{
        // 404 file not found
        // 301 redirect
        switch(path.parse(filePath).base){
            case 'old-page.html': 
                res.writeHead(301, {'Location':'/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
            default:
                //Serve 404 page
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);

        }
    }


})

server.listen(3000, ()=>console.log(`Server running on port n# ${PORT}`));