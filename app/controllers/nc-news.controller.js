const endpoints = require("../../endpoints.json")
const { selectTopics, selectArticlesById } = require("../models/nc-news.model")


const getApi = (req, res) => {
    res.status(200).send({ endpoints }) 
}

const getTopics = (req, res) => {
    selectTopics().then((result) => {
        res.status(200).send({ topics: result });
      })
}

const getArticlesById = (req, res, next) => {
    const { article_id } = req.params;
    return selectArticlesById(article_id).then((result) => {
        res.status(200).send({ article: result });
      })
      .catch((err) => {
        next(err)
      })
}


module.exports = { getApi, getTopics, getArticlesById };