import request from "supertest";
import { describe, expect } from "@jest/globals";
const server = require("../server");

describe("Test for API", () => {
  it("GET", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([])
  });
});
