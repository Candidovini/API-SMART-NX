const router = require("../routes/Routes.js");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../../swagger-output.json");

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
