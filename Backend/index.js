const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const pokedex = require("./routes/pokedex");
const users = require("./routes/login");
const { corsMiddleware } = require("./validators/middleware");

require("dotenv").config();
const app = express();
app.disable('x-express-by');
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(corsMiddleware())
app.use("/api", pokedex);
app.use("/api/users", users)
app.use("/imagenes/", express.static('imagenes'));

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`servidor corriendo en puerto ${port}`);
});
