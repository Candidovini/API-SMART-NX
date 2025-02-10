const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/api/app.js"];
const pathRoot = require("./src/api/app.js");

const port = process.env.API_PORT || 3001;
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Smart NX Media Doc",
    version: "1.0.0",
    description: "Documentação da API Smart NX Media",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition).then(
  () => pathRoot
);
