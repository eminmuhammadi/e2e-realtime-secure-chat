const Fastify = require("fastify");

const app = Fastify({logger: true});
const logger = app.log;

// Run the server!
const StartHTTPServer = async (app) => {
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
    logger,
    StartHTTPServer,
};
