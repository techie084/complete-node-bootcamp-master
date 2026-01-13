// console.log(arguments);
// console.log(require("module").wrapper);

// Modules.exports
const Calc = require("./test-module-1").default;
const calc1 = new Calc();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 5));

// Caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
