const db = require("../../db/connection");

const selectTopics = () => {
    return db.query(`SELECT * FROM topics`)
    .then((result) => {
      return result.rows;
    });
}

const selectArticlesById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((result) => {
        if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" })
      } 
        return result.rows[0]
    })
}

const selectArticles = () => {
    return db.query(`SELECT
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes, 
        articles.article_img_url,
        COUNT(comments.comment_id)::INT AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;`)
    .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({ status: 404, msg: 'Path not found' });
        }
        return result.rows
      })
}


module.exports = { selectTopics, selectArticlesById, selectArticles };