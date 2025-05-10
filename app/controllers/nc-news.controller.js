const comments = require("../../db/data/test-data/comments")
const endpoints = require("../../endpoints.json")
const { selectTopics, selectArticleById, selectArticles, selectComments, insertCommentByArticleId, updateVotesByArticleId, deleteCommentFromDb, selectUsers, fetchAllArticles } = require("../models/nc-news.model")


const getApi = (req, res) => {
    res.status(200).send({ endpoints }) 
}

const getTopics = (req, res, next) => {
    selectTopics().then((result) => {
        res.status(200).send({ topics: result })
      })
      .catch((err) => {
        next(err)
      })
}


const getArticlesById = (req, res, next) => {
    const { article_id } = req.params

    selectArticleById(article_id)
      .then((article) => {
        if (!article) {
          return Promise.reject({ status: 404, msg: 'Not Found' })
        }
        res.status(200).send({ article })
      })
      .catch((err) => {
        next(err)
      })
  }


const getArticles = (req, res, next) => {
    const { sort_by, order, topic } = req.query
  
    selectArticles(sort_by, order, topic)
      .then((articles) => {
        res.status(200).send({ articles })
      })
      .catch(next)
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


const postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body

  if (!username || !body) {
    return res.status(400).send({ msg: "Missing required fields" })
  }

  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "Invalid article_id" })
  }

  insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment })
    })
    .catch((err) => {
      if (err.code === '23503') {
        return res.status(404).send({ msg: "Article or user not found" })
      }
      next(err)
    })
}

const patchArticleVotes = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body

    if (typeof inc_votes !== "number") {
      return res.status(400).send({ msg: "inc_votes must be a number" });
    }

    if (isNaN(article_id)) {
      return res.status(400).send({ msg: "Invalid article_id" });
    }

    updateVotesByArticleId(article_id, inc_votes)
    .then((updatedArticle) => {
      if (!updatedArticle) {
        return res.status(404).send({ msg: "Article not found" });
      }
        res.status(200).send({ article: updatedArticle })
    })
    .catch((err) => {
        next(err)
    })
}
    
    
const deleteComment = (req, res, next) => {
  const { comment_id } = req.params

  if (isNaN(comment_id)) {
    return res.status(400).send({ msg: "Invalid comment_id" })
  }

  deleteCommentFromDb(comment_id)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).send({ msg: "Comment not found" })
      }
      res.status(204).send()
    })
    .catch(next)
}


const getUsers = (req, res, next) => {
    selectUsers().then((result) => {
        res.status(200).send({ users: result });
      })
          .catch((err) => {
        next(err)
    })
}


const getAllArticles = (req, res, next) => {
  const { sort_by, order } = req.query;

  const validOrders = ['asc', 'desc'];
  if (order && !validOrders.includes(order.toLowerCase())) {
    return res.status(400).send({ msg: 'Invalid order value' });
  }

  fetchAllArticles(sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};











module.exports = { getApi, getTopics, getArticlesById, getArticles, getComments, postComment, patchArticleVotes, deleteComment, getUsers, getAllArticles};