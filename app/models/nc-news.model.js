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
        return Promise.reject({ status: 404, msg: "Not Found" });
      } 
        return result.rows[0]
    })
}


module.exports = { selectTopics, selectArticlesById };