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

const selectComments = (article_id) => {
    return db.query(`
    SELECT 
      comment_id,
      votes,
      created_at,
      author,
      body,
      article_id
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;`, [article_id])
    .then(result => result.rows)
}

const insertCommentByArticleId = (article_id, username, body) => {
    return db.query(`
        INSERT INTO comments (article_id, author, body)
        VALUES ($1, $2, $3)
        RETURNING *`, [article_id, username, body])
        .then((result) => {
            return result.rows[0]
        })
}   


const updateVotesByArticleId = (article_id, inc_votes) => {
    return db.query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *
        `, [inc_votes, article_id])
        .then((result) => {
            return result.rows[0]
        })
}   

const deleteCommentFromDb = (comment_id) => {
    return db.query(`
      DELETE FROM comments
      WHERE comment_id = $1
      RETURNING *;`, [comment_id])
      .then((result) => {
        return result.rows[0]
      })
  }

// const selectUsers = () => {
//     return db.query(`SELECT * FROM users`)
//     .then((result) => {
//         console.log(result.rows)
//         return result.rows
//     })
// }



module.exports = { selectTopics, selectArticlesById, selectArticles, selectComments, insertCommentByArticleId, updateVotesByArticleId, deleteCommentFromDb };