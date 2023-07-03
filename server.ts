const cluster = require("cluster");
const os = require("os");
const http = require("http");
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let users = require("./data/users.json");
const webpack = require("webpack");
require("dotenv").config();

const PORT = process.env.PORT;

const numCPUs = os.availableParallelism();

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: any) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer((req: any, res: any) => {
    req.users = users;
    switch (req.method) {
      case "GET":
        getReq(req, res);
        break;
      case "POST":
        postReq(req, res);
        break;
      case "PUT":
        putReq(req, res);
        break;
      case "DELETE":
        deleteReq(req, res);
        break;
      default:
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.write(
          JSON.stringify({ title: "Not Found", message: "Request not found" })
        );
        res.end();
    }
  });

  server.listen(PORT, () => {
    console.log(`Server ${process.pid} started on port: ${PORT}`);
  });

  module.exports = server;
}
