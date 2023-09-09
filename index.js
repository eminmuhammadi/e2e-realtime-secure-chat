const {app, StartHTTPServer} = require("./server.js");
const {registerRoutes} = require("./routes.js");
const {registerSocket} = require("./socket.js");

// Register routes
registerRoutes(app);

// Register socket.io
registerSocket(app);

// Start the server
StartHTTPServer(app);
