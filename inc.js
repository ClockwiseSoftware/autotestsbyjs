var file = process.argv[3];
var app = require('./app');
console.log(file);
console.log(app);
require(file)(app);
