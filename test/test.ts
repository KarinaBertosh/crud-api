import request from "supertest";
import { expect } from "@jest/globals";
import fs from "fs";
const server = require("../server");
const fileName = "./data/users.json";
const file = require("../data/users.json");

// let id: any;

let defaultData: Object[] = [];
let testUser = {
  username: "Karina",
  age: "22",
  hobbies: "cycling",
};

// const readData = async () => {
//   let data: any = await fs.readFileSync(fileName);
//   id = JSON.parse(data)[0].id;
//   console.log(0, id);
  
// };


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

test("POST", async () => {
  const res = await request(server).post("/api/users").send(testUser);
  expect(res.statusCode).toEqual(201);
  // expect(res.body).toStrictEqual(testUser);
});

// test("DELETE", async () => {
//   await request(server).post("/api/users").send(testUser);
//   const resDel = await request(server).delete(`/api/users/${id}`);
//   expect(resDel.statusCode).toEqual(204);
//   // expect(res.body).toStrictEqual([testUser]);
// });
