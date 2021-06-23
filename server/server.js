const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const postsRoute = require("./routes/posts");

const jwt = require("jsonwebtoken");

const MongoClient = require("mongodb").MongoClient;
const { JsonWebTokenError } = require("jsonwebtoken");

const connUrl = "mongodb://root:password@localhost";
const mongo = new MongoClient(connUrl);

const server = express();
server.use(cors());
server.use(bodyParser.json());

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }

  const SECRET = "GEHEIM";

  const accessToken = req.headers.authorization.split(" ")[1];

  jwt.verify(accessToken, SECRET, (err, payload) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    if (payload.username) {
      req.username = payload.username;
      next();
    } else {
      res.sendStatus(403);
    }
  });
};

mongo.connect((err) => {
  if (err) {
    console.log(err);
  }
});

server.get("/", (req, res) => res.send("Hier isn server."));
server.post("/login", loginRoute(mongo));
server.post("/register", registerRoute(mongo));
server.get("/posts", authMiddleware, postsRoute);

server.post("/contact", (req, res) => {
  console.log(req.body);

  res.sendStatus(200);
});

server.listen(3000, () => {
  console.log("Der Server läuft");
});
