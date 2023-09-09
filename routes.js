const registerRoutes = (app) => {
    // Serve static files (e.g., HTML, CSS, and JavaScript)
    app.register(require("@fastify/static"), {
        root: __dirname + "/public",
    });

    app.get("/", (req, res) => {
        res.code(200).sendFile("index.html");
    });
};

module.exports = {
    registerRoutes,
};
