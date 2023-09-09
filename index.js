const {secureApp, StartServer} = require("./server.js");
const {registerRoutes} = require("./routes.js");
const {registerSocket} = require("./socket.js");

// Register routes
registerRoutes(secureApp); // or app (for http)

// Register socket.io
registerSocket(secureApp); // or app (for http)

// Start the server
StartServer(secureApp); // or app (for http)
