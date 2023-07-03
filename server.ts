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

const PORT = Number(process.env.PORT) || 5000;
let clusterPORT = Number(process.env.PORT) || 4000;

const args = process.argv;

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

if (args.length > 2 && args.at(-1) === "--multi") {
  const numCPUs = os.availableParallelism();
  const arrCpus = new Array(numCPUs);
  
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
      arrCpus[i] = cluster.fork({
        CLUSTER_PORT: clusterPORT + i + 1,
      });
    }

    cluster.on("exit", (worker: any) => {
      console.log(`worker ${worker.process.pid} died`);
    });


  } else {
    clusterPORT = Number(process.env.CLUSTER_PORT);
    console.log(`Server ${process.pid} started on port: ${clusterPORT}`);
    server.listen(clusterPORT);
  }
} else {
  server.listen(PORT, () => {
    console.log(`Server started on port: ${clusterPORT}`);
  });
}

module.exports = server;
