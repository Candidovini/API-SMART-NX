require("dotenv").config();
const app = require("./app");
const apiPort = process.env.API_PORT || 3001;

app.listen(apiPort, () => console.log("API in the port", apiPort));
