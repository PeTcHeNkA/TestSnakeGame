var liveServer = require('live-server');
var path = require('path')
var chalk = require('chalk')
 
var params = {
    port: 8000, // Set the server port. Defaults to 8080.
    host: "192.168.100.4", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: path.resolve("./"), // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 0, // 0 = errors only, 1 = some, 2 = lots
    middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};
console.log(chalk `{green Server running at http://${params.host}:${params.port}/}`);
liveServer.start(params);
