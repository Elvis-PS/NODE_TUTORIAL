const logEvent = require('./logEvent');


const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

//this is the declaration of the method that will be implemeted by .emit
myEmitter.on('log', (msg)=>logEvent(msg));

setTimeout(()=>{
    //this is the implementaion of the method  .on
    myEmitter.emit('log', 'Log went emitted');
}, 2000)