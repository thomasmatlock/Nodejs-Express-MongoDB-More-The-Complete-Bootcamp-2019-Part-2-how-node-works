const fs = require("fs");
const crypto = require("crypto");

setTimeout(() => console.log("Timer 1 finished."), 0); // number here is timer during in ms
setImmediate(() => console.log("Immediate 1 finished"));

const start = Date.now(); // date in milliseconds
process.env.UV_THREADPOOL_SIZE = 1; // artificially reduces threadpool count from 4 to 1 to increase time required to encrypt 4 passwords below

fs.readFile("test-file.txt", () => {
	console.log("IO finished");
	console.log("------------");
	setTimeout(() => console.log("Timer 2 finished."), 0);
	setTimeout(() => console.log("Timer 3 finished."), 3000);
	setImmediate(() => console.log("Immediate 2 finished")); // this finishes before timer 2, because event loop considers it higher priority

	process.nextTick(() => console.log("process.nextTick completed")); // pretty cool, this is all just priority. tick, then immediate, then timer
	// nextTick is between each of the 4 nodejs phases (expired timer callbacks, IO polling/callbacks, setImmediate callbacks, close callbacks)

	// nextTick gets executed immediately
	//setImmediate gets executes once per tick
	// all callbacks are offloaded to threadpool

	crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512"); // iterations, keylength, algorithm to encrypt
	console.log(Date.now() - start + " milliseconds, password encrypted");
});

console.log("hello from the top level code");
