const comments = require("../../db/data/test-data/comments")
const endpoints = require("../../endpoints.json")
const { selectTopics, selectArticles, selectComments, insertCommentByArticleId, updateVotesByArticleId, deleteCommentFromDb, selectUsers } = require("../models/nc-news.model")


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
    return updateVotesByArticleId(article_id).then((result) => {
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


const postComment = (req, res, next) => {
    const { article_id } = req.params
    const { username, body } = req.body
    console.log(article_id)
    insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
        res.status(201).send({ comment })
    })
    .catch((err) => {
        next(err)
    })
}

const patchArticleVotes = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body
    updateVotesByArticleId(article_id, inc_votes)
    .then((updatedArticle) => {
        res.status(200).send({ article: updatedArticle })
    })
    .catch((err) => {
        next(err)
    })
}
    
    
const deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    deleteCommentFromDb(comment_id)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        next(err)
      });
  }


const getUsers = (req, res) => {
    selectUsers().then((result) => {
        res.status(200).send({ users: result });
      })
          .catch((err) => {
        next(err)
    })
}





module.exports = { getApi, getTopics, getArticlesById, getArticles, getComments, postComment, patchArticleVotes, deleteComment, getUsers};