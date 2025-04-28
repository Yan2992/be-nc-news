const endpointsJson = require("../endpoints.json");
const express = require("express");
const app = express();
const db = require("../db/connection");
const { getApi } = require("./controllers/nc-news.controller");


app.get("/api", getApi);

module.exports = app;