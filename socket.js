const socket_io = require("fastify-socket.io");
const {logger} = require("./server.js");
const SecureCommunication = require("./lib/index.js");

// Initialize secure communication
const secCom = new SecureCommunication();

const registerSocket = (app) => {
    app.register(socket_io);

    app.ready().then(() => {
        const io = app.io;
        if (!io) {
            throw new Error("Could not initialize socket.io");
        }

        initSocket(io);
    });
};

const initSocket = (io) => {
    // Socket.io logic
    io.on("connection", (socket) => {
        logger.info(`${socket.id} connected`);

        // Send the client the N and G values
        socket.on("init", () => {
            socket.emit("init", {
                socket_id: socket.id,
                N: secCom.getN().toString(),
                G: secCom.getG().toString(),
            });
        });

        // Listen for chat messages
        socket.on("send", (data) => {
            if (!data.toPubK || !data.fromPubK || !data.message) {
                logger.error(`Invalid data received from ${socket.id}`);
                return;
            }

            // Broadcast the message to all connected clients
            io.emit("chat", {
                socket_id: socket.id,
                data,
                timestamp: Date.now(),
            });
        });

        // Handle user disconnection
        socket.on("disconnect", () => {
            logger.info(`${socket.id} disconnected`);
        });
    });
};

module.exports = {
    registerSocket,
};
