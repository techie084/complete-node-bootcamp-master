const fs = require("fs");
const http = require("http");
const url = require("url");

// third party library / modules
const slugify = require("slugify");

// Our own library / modules
const replaceTemplate = require("./modules/replaceTemplate");

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url);

  // OverView Page
  if (pathname === "/" || pathname === "/overview") {
    response.writeHead(200, { "content-type": "text/html" });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%Product_Card%}", cardHtml);
    response.end(output);

    // Product Page
  } else if (pathname === "/product") {
    response.writeHead(200, { "content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    response.end(output);

    // Api
  } else if (pathname === "/api") {
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

//  Introduction to Backend Web-Development

// How NodeJs Works
