const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished "), 0);
setImmediate(() => console.log("immediate 1 finished"));

fs.readFile("test-fle.txt", () => {
  console.log("i/o finished");
  console.log("-----------------");

  setTimeout(() => console.log("Timer 2 finished "), 0);
  setTimeout(() => console.log("Timer 3 finished "), 3000);
  setImmediate(() => console.log("immediate 2 finished"));

  process.nextTick(() => console.log("Process NextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "PassWord encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "PassWord encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "PassWord encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "PassWord encrypted");
  });

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "PassWord encrypted");
});

console.log("Hello from the top-level code");
