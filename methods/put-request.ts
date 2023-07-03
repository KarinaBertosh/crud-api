import { Users } from "../types";

const requestBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async (req: any, res: any) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const uuId = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (!uuId.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/users/" && uuId.test(id)) {
    try {
      let body = await requestBodyParser(req);
      if (body === "") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            title: "Validation Failed",
            message: "Object is not valid",
          })
        );
      } else {
        const index = req.users.findIndex((users: Users) => {
          return users.id === id;
        });
        if (index === -1) {
          res.statusCode = 404;
          res.write(
            JSON.stringify({ title: "Not Found", message: "Users not found" })
          );
          res.end();
        } else {
          req.users[index] = { id, ...body };
          writeToFile(req.users);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(req.users[index]));
        }
      }
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
