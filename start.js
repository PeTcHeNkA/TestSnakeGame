var liveServer = require('live-server');
var path = require('path')
var chalk = require('chalk')
 
// The parameters for the live server
var params = {
 // The server port. Default is 8080.
 // You can change it to any available port number.
 port: 8000,

 // The address to bind to. Default is 0.0.0.0 or process.env.IP.
 // You can change it to localhost or your IP address.
 host: "localhost",

 // The root directory that's being served. Default is the current working directory.
 // You can change it to any relative or absolute path.
 root: path.resolve("./"),

 // If false, it won't load the browser by default.
 // You can change it to true if you want to open the browser automatically.
 open: false,

 // A string for paths to ignore
 // You can use commas to separate multiple paths.
 // For example: 'scss,my/templates,assets'
 ignore: 'scss,my/templates',

 // The file to serve for every 404
 // You can use any file name that exists in your root directory.
 // For example: 'index.html', '404.html', 'home.html'
 file: "index.html",

 // The time to wait before reloading
 // You can use any positive number in milliseconds.
 // For example: 1000, 5000, 10000
 wait: 1000,

 // A directory to mount to a route
 // You can use an array of arrays with two elements each.
 // The first element is the route and the second element is the directory.
 // For example: [['/components', './node_modules'], ['/images', './assets']]
 mount: [['/components', './node_modules']],

 // The level of logging
 // You can use one of these values: 0 = errors only, 1 = some, 2 = lots
 logLevel: 2,

 // An array of middleware
 // You can use any Connect-compatible middleware functions in this array.
 // They will be executed before serving the files.
 // For example: [function(req, res, next) { console.log(req.url); next(); }]
 middleware: [function(req, res, next) { next(); }]
};

// A message to the console with green color
console.log(chalk `{green Server running at http://${params.host}:${params.port}/}`);

// Start the live server
liveServer.start(params);
