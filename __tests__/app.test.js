const endpointsJson = require("../endpoints.json");
const app = require("../app/app");
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
        expect(topics).toHaveLength(3)
        expect(topics[0]).toHaveProperty("slug")
        expect(topics[0]).toHaveProperty("description")
      })
    })
  })

  describe("GET /api/articles/1", () => {
    test("200: Responds with: an article object, which should have the following properties: author, title, article_id, body, topic, created_at, votes, article_img_url", () => {
      return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const articlesResult = response.body.article
        expect(articlesResult).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        })
      })
    })
  })

  describe("GET /api/articles/999999999", () => {
    test("404: Responds with bad request if sent an invalid ID that doesn't exist", () => {
      return request(app)
      .get("/api/articles/999999999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe(("Not Found"))
      })
    })
  })

  describe("GET /api/articles/banana", () => {
    test.only("400: Responds with bad request if sent an invalid ID", () => {
      return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe(("Invalid input"))
      })
    })
  })

});
