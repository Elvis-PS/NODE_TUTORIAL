const EventEmitter = require('events');

const myEvents = new EventEmitter();

//retister a listener: the fist parameter is the identifier of the listner
myEvents.addListener('message', function(message){console.log(message)})


let message = 'this is the message you have for any event';

//Raise an event. the parameter is the identifier of the listener
myEvents.emit('message', message);