const Fastify = require("fastify");
const fs = require("fs");
const path = require("path");

// http server
const app = Fastify({logger: true});

// https server
const secureApp = Fastify({
    logger: true,
    http2: true,
    https: {
        allowHTTP1: true,
        key: fs.readFileSync(path.join(__dirname, ".tls", "server-key.pem")),
        cert: fs.readFileSync(path.join(__dirname, ".tls", "server-cert.pem")),
    },
});

const logger = app.log;

// Run the server!
const StartServer = async (app) => {
    try {
        await app.listen({
            port: process.env.PORT || 3000,
            host: process.env.HOST || "0.0.0.0",
        });
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};

module.exports = {
    app,
    secureApp,
    logger,
    StartServer,
};
