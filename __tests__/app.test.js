const endpointsJson = require("../endpoints.json");
const app = require("../app/app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const topics = require("../db/data/test-data/topics");
const articles = require("../db/data/test-data/articles");
const comments = require("../db/data/test-data/comments");

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
      .then(({ body: { endpoints }}) => {
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
    test("400: Responds with bad request if sent an invalid ID", () => {
      return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe(("Invalid input"))
      })
    })
  })

  describe("GET /api/articles", () => {
    test("200: Responds with an array of articles object, each of which should have properties of: author, title, article_id, topic, created_at, votes, article_img_url, comment_count", () => {
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles
        expect(articles).toHaveLength(13)
        expect(articles[0]).toHaveProperty("author")
        expect(articles[0]).toHaveProperty("title")
        expect(articles[0]).toHaveProperty("article_id")
        expect(articles[0]).toHaveProperty("topic")
        expect(articles[0]).toHaveProperty("created_at")
        expect(articles[0]).toHaveProperty("votes")
        expect(articles[0]).toHaveProperty("votes")
        expect(articles[0]).toHaveProperty("article_img_url")
      })
    })
  })

  describe("GET /api/articles", () => {
    test("200: Responds with returned articles that do not have a 'body' property", () => {
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles
        articles.forEach((article) => {
          expect(article).not.toHaveProperty("body")
        })
      })
    })
  })

  describe("GET /api/articles", () => {
    test("200: make sure articles are sorted by created_at in descending order", () => {
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles
         const isSortedInDescOrder = articles.every((current, index) => {
            if (index === 0) return true
            return current.created_at <= articles[index - 1].created_at
          })
          expect(isSortedInDescOrder).toBe(true)
        })
      })
    })

test("404: responds with message 'Path not found' for an invalid endpoint", () => {
  return request(app)
    .get('/api/article/1/comments')
    .expect(404)
    .then((res) => {
      expect(res.body.msg).toBe('Path not found')
    })
})


});
