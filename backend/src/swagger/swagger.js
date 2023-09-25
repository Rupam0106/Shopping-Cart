const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../../package.json");
const log = require("../logger/logger");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API DOC E-Commerce",
      description:"An ecommerce website is your digital storefront on the internet. It facilitates the transaction between a buyer and seller. It is the virtual space where you showcase products, and online customers make selections.",
      version,
    },
  },
  apis: ["./src/swagger/docsSchema.js", "./src/swagger/userDocs.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // docs in json format
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs Available at http://localhost:${port}/docs `);
}
module.exports = swaggerDocs;
