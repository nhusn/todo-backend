const express = require("express");
const route = require("./router");
require("./DB/connection.js");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());
server.use(route);

server.listen(3000, () => {
  console.log("Server started");
});

server.get("/", (req, res) => {
  res.send("Server started and waiting for client request");
});
