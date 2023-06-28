var server = require("../server.ts"),
  chai = require("chai"),
  request = require("supertest");
describe("POST /users", function () {
  it("responds with json", function (done) {
    request(server)
      .post("/api/users")
      .send({
        username: "Olga Crug 16",
        age: "32",
        hobbies: "running",
      })
      .expect("Content-Type", "application/json")
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
