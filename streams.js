const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // Solution 1
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    // Solution 2: streams
    // const readable = fs.createReadStream('test-file.txt');
    // // each time the stream has a new ready chunk, it emits an event
    // // here setup a listener to listen for the data event it emits
    // readable.on('data', (chunk) => {
    //     // were going to write it to a writable stream, so basically everytime a chunk becomes available, we write it
    //     // response below is a writable stream  
    //     res.write(chunk);
    //     // effectively, were streaming the file straight to the client
    //     // before, we read everything from a file into a variable, and sent that as a response, a big one
    //     // with a stream, we read a piece of the file, and soon as its available, we send it through
    //     // as every chunk becomes available, we write it to the stream. pretty cool
    // })

    // // handle the event node finishes reading data from the file
    // readable.on('end', () => {
    //     res.end(); // we dont send any args liek data, like above, because we already streamed it
    // })

    // readable.on('error', (err) => {
    //     console.log(err);
    //     res.statusCode = 500;;
    //     res.end('File not found')

    // })

    //  Solution 3
    // a problem called backpressure happens when the read stream pulls data from file faster than network can send it
    // we will use the pipe operator. it allows us to "pipe" the output of read stream right into write stream
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res); // wow thats easy. take readable stream, use pipe method, and pass pipe method the write stream
    // readableSource.pipe(writeableDestination) is basically it
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening....');
});