const db = require("../../db/connection");

const selectTopics = () => {
    return db.query(`SELECT * FROM topics`)
    .then((result) => {
      return result.rows
    })
}

const selectArticleById = (article_id) => {


  return db.query(`
    SELECT 
      articles.article_id,
      articles.title,
      articles.topic,
      articles.author,
      articles.body,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;
  `, [article_id])
  .then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" })
    }
    return result.rows[0]
  })
}

const selectArticles = (sort_by = "created_at", order = "desc", topic = null) => {
  const validSortBy = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count"
  ];
  const validOrder = ["asc", "desc"]

  if (!validSortBy.includes(sort_by)) sort_by = "created_at"
  if (!validOrder.includes(order.toLowerCase())) order = "desc"

  let sortColumn = sort_by

  if (sort_by === "comment_count") {
    sortColumn = "COUNT(comments.comment_id)"
  } else {
    sortColumn = `articles.${sort_by}`
  }

  let queryStr = `
    SELECT
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
  `;

  if (topic) {
    queryStr += ` HAVING articles.topic = $1`
    return db.query(queryStr, [topic]).then((result) => result.rows)
  }

  queryStr += ` ORDER BY ${sortColumn} ${order};`

  return db.query(queryStr).then((result) => result.rows)
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

const selectUsers = () => {
    return db.query(`SELECT * FROM users`)
    .then((result) => {
        
        return result.rows
    })
}

const fetchAllArticles = (sort_by = "created_at", order = "desc") => {

  console.log('Received sort_by:', sort_by, 'order:', order); 
  const validSortColumns = [
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes"
  ];

  if (!validSortColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by value" });
  }

  const queryStr = `
    SELECT articles.*, COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};
  `;

  return db.query(queryStr).then((result) => result.rows);
};




module.exports = { selectTopics, selectArticleById, selectArticles, selectComments, insertCommentByArticleId, updateVotesByArticleId, deleteCommentFromDb, selectUsers, fetchAllArticles };