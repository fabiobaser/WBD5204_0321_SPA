const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const loginRoute = require("./routes/login");
const postsRoute = require("./routes/posts");

const jwt = require("jsonwebtoken");

const MongoClient = require("mongodb").MongoClient;
const { JsonWebTokenError } = require("jsonwebtoken");

const connUrl = "mongodb://root:password@localhost";
const mongo = new MongoClient(connUrl);

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.get("/", (req, res) => res.send("Hier isn server."));

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

server.post("/login", loginRoute);
server.get("/posts", authMiddleware, postsRoute);

server.post("/contact", (req, res) => {
  console.log(req.body);

  res.sendStatus(200);
});

server.listen(3000, () => {
  console.log("Der Server läuft");

  // mongo.connect((err) => {
  //   const db = mongo.db("greenfox");
  //   const dinnerplans = db.collection("dinnerplans");

  //   dinnerplans.find({}).toArray((err, docs) => console.log(docs));

  //   mongo.close();
  // });
});
