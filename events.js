///////////////////////////////////////////////////////////////////
// FLOW CHART 
// *require in needed module*
// (optional) create class the extends/inherits methods from imported module
// *create new instance* of imported module
// *start using the instance* with whatever methods you need
// modules have emitter/listener models (event driven, observer model, methods), like http, and or async / sync methods, like fs
///////////////////////////////////////////////////////////////////
const EventEmitter = require('events'); // import module needed
const http = require('http');


// create a new class that inherits/clones all functionality from the parent class
// every class gets a constructor function that runs on creation
class Sales extends EventEmitter {
    constructor() {
        super(); // this constructor calls the super class (EventEmitter in this case, this makes it inherit all functionality upon construction) it gives us all the methods of the super class
        this.test = 47;
    }
}

const myEmitter = new Sales(); // create new instance of imported module

// below we setup multiple listeners for a single event emitted
myEmitter.on('newSale', (event) => {
    // console.log('There was a new sale!');

})

myEmitter.on('newSale', (event) => {
    // console.log('The new sale was for $15');

})

myEmitter.on('newSale', (stock) => {
    // console.log(`There are now ${stock} items left in stock.`);

})
myEmitter.emit('newSale', 9); // this simulates a button being clicked, using our events module to emit it

/////////////////////////////////

const server = http.createServer(); // create instance of server

// create multiple listeners again
server.on('request', (req, res) => {
    console.log('Request received!');
    console.log(req.url); // get access to url

    res.end('Request received!')
})

server.on('request', (req, res) => {
    console.log('Another request received!');
    // res.end('Another request received!')
})

server.close('close', (req, res) => {
    console.log('Server closed');

})

// start the server up using listen, pass it port, ip
server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests');
    console.log('----------------------------------------------------------------');

})