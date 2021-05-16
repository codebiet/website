// require('dotenv').config({path:'./.env'}).load();
const dotenv = require("dotenv");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const getRoutes = require("./backend/routes/getRoutes");
const postRoutes = require("./backend/routes/postRoutes");
const app = express();

dotenv.config();
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + "/client"));
app.use(logger("dev"));
// app.set("views", __dirname + "/client/views");
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);

app.use(
  session({
    name: "userId",
    secret: "ldsjfowodljlc*&%$A#haierh&%$##L",
    resave: false,
    saveUninitialized: false,
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: null },
  })
);

// app.use("/post", postRoutes);
// app.use("/*", getRoutes);


app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("App started running at " + app.get("port"));
});

module.exports = app;
