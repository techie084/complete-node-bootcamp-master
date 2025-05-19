// const { error } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////
// Files
// Blocking , Synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about te avocado : ${textIn} \n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file written !");

// Non-blocking , Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) =>{
//     if (err) return console.log(err.message);
//
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) =>{
//         console.log(data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3)=>{
//             console.log(data3);
//
//             fs.writeFile("./txt/final.txt",`${data2}\n${data3}`, "utf-8", (err)=>{
//                 console.log("Your file has been written");
//             })
//         })
//     })
// })
// console.log("will read file!")

/////////////////////////////////
// Server

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%ProductName%}/g, product.productName);
  output = output.replace(/{%Image%}/g, product.image);
  output = output.replace(/{%Price%}/g, product.price);
  output = output.replace(/{%From%}/g, product.from);
  output = output.replace(/{%Nuntrient%}/g, product.nutrients);
  output = output.replace(/{%Quantity%}/g, product.quantity);
  output = output.replace(/{%Id%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%Not_Organic%}/g, "not-organic");
  };
  return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((request, response) => {

  console.log(request.url);
  console.log(url.parse(  ));
  const pathName = request.url;

  // OverView Page
  if (pathName === "/" || pathName === "/overview") {
    response.writeHead(200, { "content-type": "text/html" });

    const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el));
    const output = tempOverview.replace("{%Product_Card%}", cardHtml);
    response.end(output);

    // Product Page
  } else if (pathName === "/product") {
    response.end("this is the Product");

    // Api
  } else if (pathName === "/api") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(data);

    // Not Found
  } else {
    response.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello World",
    });

    response.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listen to request on port 8000");
});
