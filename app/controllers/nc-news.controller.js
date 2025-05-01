const comments = require("../../db/data/test-data/comments")
const endpoints = require("../../endpoints.json")
const { selectTopics, selectArticlesById, selectArticles, selectComments, insertCommentByArticleId } = require("../models/nc-news.model")


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

const getArticles = (req, res, next) => {
    selectArticles()
    .then((result) => {
        res.status(200).send({ articles: result })
      })
      .catch((err) => {
        next(err)
      })
}

const getComments = (req, res, next) => {
    const { article_id } = req.params
    selectComments(article_id)
    .then((comments) => {
        if (comments.length === 0) {
        return res.status(404).send({ msg: "Not Found" })
        }
        res.status(200).send({ comments })
    })
    .catch((err) => {
        next(err)
    })
}



module.exports = { getApi, getTopics, getArticlesById, getArticles, getComments };