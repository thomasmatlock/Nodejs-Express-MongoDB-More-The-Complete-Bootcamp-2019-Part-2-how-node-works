// console.log(arguments); // logs all 5 arguments
// require
// module, reference to the current module -
// exports, reference to module.exports, used to
// __filename, absolute path of the current module 's file -
// __dirname, dir name of the current module

// console.log(require('module').wrapper); // oh wow, it shows all 5 of the properties
// this is the template that node uses to fill up everytime we require a module

// module.exports (single value)
const C = require('./test-module-1'); // its our own module, gotta use path to it
const calc1 = new C();
console.log(calc1.add(4, 2));

// exports (multiple values) (notice no new instance creation is needed here)
// basic, no destructuring
// const calc2 = require('./test-module-2');
// console.log(calc2.add(4, 2));

// destructuring
const {
    add,
    multiply,
    divide
} = require('./test-module-2');
console.log(add(4, 2));

// caching
// this is only loaded once, so anything inside it is just done once
// the 2nd log was stored in cache, then retrieved on 2nd/3rd calls
require('./test-module-3')(); // is this an IIFE?
require('./test-module-3')(); // is this an IIFE?
require('./test-module-3')(); // is this an IIFE?