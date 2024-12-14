//some helper file to generate secretes
const crypto = require("crypto");
console.log(crypto.randomBytes(64).toString('hex'))