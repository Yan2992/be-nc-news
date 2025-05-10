const endpointsJson = require("../endpoints.json");
const app = require("../app/app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const { toBeSortedBy } = require("jest-sorted");


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
      })
  })
})

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

  describe("GET /api/articles/:article_id", () => {
    test("200: Responds with a full article object including comment_count", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
          const article = response.body.article;
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 11
          });
        });
    });
  });

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


describe("GET /api/articles/1/comments", () => {
  test("200: Responds with an array of comments for the given article_id of which each comment should have the following properties: comment_id, votes, created_at, author, body, article_id", () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then((response) => {

      const comments = response.body.comments

        expect(Array.isArray(comments)).toBe(true)

        expect(comments.length).toBeGreaterThan(0)

        expect(comments[0]).toHaveProperty("comment_id")
        expect(comments[0]).toHaveProperty("votes")
        expect(comments[0]).toHaveProperty("created_at")
        expect(comments[0]).toHaveProperty("author")
        expect(comments[0]).toHaveProperty("body")
        expect(comments[0]).toHaveProperty("article_id")
    })
  })
})

  describe("GET /api/articles/1/comments", () => {
    test("200: make sure comments are sorted by created_at in descending order", () => {
      return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments
         const isSortedInDescOrder = comments.every((current, index) => {
            if (index === 0) return true
            return current.created_at <= comments[index - 1].created_at
          })
          expect(isSortedInDescOrder).toBe(true)
        })
      })
    })

    describe("GET /api/articles/:article_id/comments", () => {
      test("404: Returns Not Found if article_id doesn't exist", () => {
        return request(app)
          .get("/api/articles/999999999/comments")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("Not Found")
          })
      });
    })

    describe("POST /api/articles/1/comments", () => {
      test("201: POST: Responds with a new posted comment that has an object of author and body only", () => {
        const newComment = {
          username: "butter_bridge",
          body: "Great Article!"
        }
        return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then((response) => {
          const comment = response.body.comment 
          expect(comment).toHaveProperty("author", "butter_bridge");
          expect(comment).toHaveProperty("body", "Great Article!");
          })
        })
      })


  test("400: missing body property returns error", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge"
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing required fields")
      });
  });

  test("400: missing username returns error", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        body: "Oops!"
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing required fields");
      });
  });

  test("400: article_id is not a number", () => {
    return request(app)
      .post("/api/articles/notanid/comments")
      .send({
        username: "butter_bridge",
        body: "Nice one!"
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid article_id")
      })
  })

  test("404: article_id does not exist", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send({
        username: "butter_bridge",
        body: "This article doesn't exist."
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article or user not found")
      });
  });

  test("404: username does not exist", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "nonexistent_user",
        body: "Should not work"
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article or user not found")
      })
  })

      
    describe("PATCH /api/articles/:article_id", () => {
      test("200: Successfully updates the votes and returns the updated article", () => {
        const article_id = 1
          return request(app)
            .patch(`/api/articles/1`)
            .send({ inc_votes: 5 })
            .expect(200)
            .then((response) => {
                const article = response.body.article;
                expect(article.votes).toBe(105)
                expect(article.article_id).toBe(article_id)
                expect(article.title).toBeDefined()
                expect(article.body).toBeDefined()
                expect(article.topic).toBeDefined()
                expect(article.author).toBeDefined()
                expect(article.created_at).toBeDefined()
            })
        })
    })

    describe("PATCH /api/articles/:article_id", () => {
      test("400: responds with error when inc_votes is not a number", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "not-a-number" })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("inc_votes must be a number");
          })
      })
    })

    test("400: responds with error when inc_votes is missing", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("inc_votes must be a number");
        })
    })

    test("400: responds with error when article_id is not a number", () => {
      return request(app)
        .patch("/api/articles/notanumber")
        .send({ inc_votes: 1 })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid article_id");
        })
    })

    test("404: responds with error when article_id does not exist", () => {
      return request(app)
        .patch("/api/articles/9999")
        .send({ inc_votes: 1 })
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Article not found");
        })
    })


      describe("DELETE /api/comments/:comment_id", () => {
        test("204: Successfully deletes the comment", () => {
          return request(app)
            .delete("/api/comments/5")
            .expect(204);
        });
        
    
      test("400: responds with error when comment_id is not a number", () => {
        return request(app)
          .delete("/api/comments/notanumber")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Invalid comment_id");
          });
      });
    
      test("404: responds with error when comment_id does not exist", () => {
        return request(app)
          .delete("/api/comments/9999")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Comment not found");
          });
      });
    });
    



      describe("GET /api/users", () => {
      test("200: Responds with an array of users object, each of which should have properties of: username, name, avatar_url", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          const users = response.body.users
          expect(users).toHaveLength(4)
          expect(Array.isArray(users)).toBe(true)
          expect(users[0]).toHaveProperty("username")
          expect(users[0]).toHaveProperty("name")
          expect(users[0]).toHaveProperty("avatar_url")
        })
      })

      test("404: returns 404 if route misspelled", () => {
        return request(app)
          .get("/api/userz")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Path not found")
          })
      })
    })


    describe("GET /api/articles", () => {
      test("200: responds with an array of articles sorted by created_at by default in descending order", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((response) => {
            const articles = response.body.articles
            expect(Array.isArray(articles)).toBe(true)
            expect(articles).toBeSortedBy("created_at", { descending: true })
            articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  article_id: expect.any(Number),
                  author: expect.any(String),
                  title: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.anything(),
                })
              )
            })
          })
      })

      test("200: sorts articles by 'title' in ascending order when provided", () => {
        return request(app)
          .get("/api/articles?sort_by=title&order=asc")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles
            const titles = articles.map(article => article.title)
            const sortedTitles = [...titles].sort()
            expect(titles).toEqual(sortedTitles)
          })
      })

      test("200: sorts articles by 'votes' in descending order when provided", () => {
        return request(app)
          .get("/api/articles?sort_by=votes&order=desc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("votes", { descending: true })
          })
      })

      test("200: Filters articles by the topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then((response) => {
            const articles = response.body.articles;
            articles.forEach((article) => {
              expect(article.topic).toBe("mitch")
            })
          })
      })


      test("200: Returns all articles if no topic is provided", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((response) => {
            const articles = response.body.articles;
            expect(articles.length).toBeGreaterThan(0)
          })
      })

   
    })