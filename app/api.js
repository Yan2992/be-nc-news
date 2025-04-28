const endpointsJson = require("../endpoints.json");
const express = require("express");
const app = express();
const db = require("../db/connection");
const { getApi, getTopics } = require("./controllers/nc-news.controller");


app.get("/api", getApi);

app.get("/api/topics", getTopics);

module.exports = app;