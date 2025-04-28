const endpointsJson = require("../endpoints.json");
const app = require("../app/api");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const topics = require("../db/data/test-data/topics");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });

  describe("GET /api/topics", () => {
    test("200: Responds with an array of topic object, each of which should have properties of: slug, description", () => {
      return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const topics = response.body.topics
        expect(topics[0]).toHaveProperty("slug")
        expect(topics[0]).toHaveProperty("description")
      })
    })
  })
});