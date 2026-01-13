const EventEmitter = require("events");
const http = require("http");

class sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Wisdom");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} item in the stock.`);
});

myEmitter.emit("newSale", 9);

//////////////////////////////////////////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request Received!");
  console.log(req.url);
  res.end("Request Received!");
});

server.on("request", (req, res) => {
  console.log("Another Request 😃");
});

server.on("close", () => {
  console.log("Server Closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
