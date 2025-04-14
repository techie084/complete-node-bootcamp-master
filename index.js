const fs = require("fs");

// Blocking , Synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is what we know about te avocado : ${textIn} \n Created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("file written !");

// Non-blocking , Asynchronous way
fs.readFile("./txt/start.txt", "utf-8", () =>{

})