import request from "supertest";
import { expect } from "@jest/globals";
import fs from "fs";
const server = require("../server");
const fileName = "./data/users.json";

let getUser: any;
console.log(0, getUser);

let defaultData: Object[] = [];
let testUser = {
  username: "Karina",
  age: "22",
  hobbies: "cycling",
};

let updateUser = {
  username: "Olga",
  age: "30",
  hobbies: "cycling",
};

async function updateData() {
  await fs.writeFile(fileName, JSON.stringify(defaultData), (err: any) => {
    if (err) throw err;
  });
}

beforeEach(() => {
  updateData();
});

afterEach(() => {
  updateData();
});

test("GET", async () => {
  const res = await request(server).get("/api/users");
  expect(res.statusCode).toEqual(200);
  expect(res.body).toStrictEqual([]);
});

describe("Test for API", () => {
  test("POST", async () => {
    const res = await request(server).post("/api/users").send(testUser);
    expect(res.statusCode).toEqual(201);
    let data: any = await fs.readFileSync(fileName);
    getUser = JSON.parse(data)[0];
  });

  test("GET/id", async () => {
    const res = await request(server).get(`/api/users/${getUser.id}`);
    expect(res.statusCode).toEqual(200);
  });

  test("PUT/id", async () => {
    const res = await request(server)
      .put(`/api/users/${getUser.id}`)
      .send(updateUser);
    expect(res.statusCode).toEqual(200);
  });

  test("DELETE", async () => {
    await request(server).post("/api/users").send(testUser);
    const resDel = await request(server).delete(`/api/users/${getUser.id}`);
    expect(resDel.statusCode).toEqual(204);
  });
});

describe("Test for API", () => {
  test("GET/id", async () => {
    const res = await request(server).get(`/api/users/${getUser.id}`);
    expect(res.statusCode).toEqual(404);
  });
});
