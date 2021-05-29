// require('dotenv').config({path:'./.env'}).load();
const dotenv = require("dotenv");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const upload = require("express-fileupload");
const getRoutes = require("./backend/routes/getRoutes");
const postRoutes = require("./backend/routes/postRoutes");
const app = express();
const multer = require("multer");
const multerUpload = multer();

dotenv.config();
app.use(cors());
app.use(upload({ createParentPath: true }));
app.use(compression());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static(__dirname + "/client"));
app.use(express.static(path.join(__dirname, "client/public/dist")));
app.use(logger("dev"));
app.set("views", __dirname + "/client/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(
  session({
    name: "userId",
    secret: "ldsjfowodljlc*&%$A#haierh&%$##L",
    resave: false,
    saveUninitialized: false,
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: null },
  })
);

app.use("/post", postRoutes);
app.use("/api", getRoutes);
app.get("/robots.txt", function (req, res) {
  res.type("text/plain");
  res.send("User-agent: *\nAllow: /");
});
//frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/dist/index.html"));
});
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("App started running at " + app.get("port"));
});

module.exports = app;
