const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../../package.json");
const log = require("../logger/logger");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API DOC E-Commerce",
      description:
        "An e-commerce app, short for electronic commerce application, is a digital platform that enables businesses to sell products or services to consumers over the internet. These apps have become increasingly popular in recent years, allowing customers to browse, purchase, and manage their orders online .ShopNow is a cutting-edge e-commerce application designed to provide an unparalleled online shopping experience for users. With a user-friendly interface and a vast array of features, ShopNow revolutionizes the way people shop and interact with products and brands",
      version,
      contact: {
        email: "apiteam@swagger.io",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development Server",
      },
      {
        url: "https://ecommerce-backend-xp0v.onrender.com",
        description: "Production Server",
      },
    ],
  },
  apis: [
    "./src/swagger/docsSchema.js",
    "./src/swagger/userDocs.js",
    "./src/swagger/productDocs.js",
    "./src/swagger/cartDocs.js",
    "./src/swagger/orderDocs.js",
  ],
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
