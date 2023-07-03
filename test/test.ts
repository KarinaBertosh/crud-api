import request from "supertest";
import { expect } from "@jest/globals";
import fs from "fs";
const server = require("../server");
const fileName = "./data/users.json";

let getUser: any;

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

updateData();

describe("First scenario: Post(201), Get/id(200), Put/id(200), Delete/id(204),", () => {
  beforeEach(() => {
    updateData();
  });
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

describe("Second scenario: Post(400), Get/id(404), Put/id(404), Delete/id(404),", () => {
  beforeEach(() => {
    updateData();
  });

  test("POST", async () => {
    const res = await request(server).post("/api/users").send({
      username: "Karina",
      age: "22",
      hobbies: "cycling",
      f: "ff",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("GET/id", async () => {
    const res = await request(server).get(`/api/users/${getUser.id}`);
    expect(res.statusCode).toEqual(404);
  });

  test("PUT/id", async () => {
    const res = await request(server)
      .put(`/api/users/${getUser.id}`)
      .send(updateUser);
    expect(res.statusCode).toEqual(404);
  });

  test("DELETE", async () => {
    await request(server).post("/api/users").send(testUser);
    const resDel = await request(server).delete(`/api/users/${getUser.id}`);
    expect(resDel.statusCode).toEqual(404);
  });
});

describe("Third scenario: Get/id(400), Put/id(400), Delete/id(400),", () => {
  beforeEach(() => {
    updateData();
  });

  test("GET/id", async () => {
    const res = await request(server).get(`/api/users/ggg`);
    expect(res.statusCode).toEqual(400);
  });

  test("PUT/id", async () => {
    const res = await request(server)
      .put(`/api/users/ggg`)
      .send(updateUser);
    expect(res.statusCode).toEqual(400);
  });

  test("DELETE", async () => {
    await request(server).post("/api/users").send(testUser);
    const resDel = await request(server).delete(`/api/users/gggg`);
    expect(resDel.statusCode).toEqual(400);
  });
});
