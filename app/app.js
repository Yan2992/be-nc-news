const endpointsJson = require("../endpoints.json");
const express = require("express");
const app = express();
const db = require("../db/connection");
const { getApi, getTopics, getArticlesById, getArticles, getComments, } = require("./controllers/nc-news.controller");


app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById); 

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getComments)


app.use((req, res) => {
  res.status(404).send({ msg: 'Path not found' });
});

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
    } else next(err)
  });

  app.use((err, req, res, next) => {
    if (err.code === "22P02") {
      res.status(400).send({ msg: "Invalid input" })
    }
})


module.exports = app;