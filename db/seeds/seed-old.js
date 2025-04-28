// const db = require("../connection")


// const seed = ({ topicData, userData, articleData, commentData }) => {
//   db.query(`DROP TABLE IF EXISTS comments;`)
//   .then(() => db.query(`DROP TABLE IF EXISTS articles;`))
//   .then(() => db.query(`DROP TABLE IF EXISTS users;`))
//   .then(() => db.query(`DROP TABLE IF EXISTS topics;`))

//   .then(() => {
//     return db.query(`CREATE TABLE topics (
//         slug VARCHAR(100) PRIMARY KEY,
//         description VARCHAR(1000),
//         img_url VARCHAR(1000)
//         );`)

//   })
//   .then(() => {
//     return db.query(`CREATE TABLE users (
//       username VARCHAR(50) PRIMARY KEY,
//       name VARCHAR(50),
//       avatar_url VARCHAR(1000)
//       );`)
//   })

//   .then(() => {
//     return db.query(`CREATE TABLE articles (
//       article_id SERIAL PRIMARY KEY,
//       title VARCHAR(50),
//       topic VARCHAR(50) NOT NULL REFERENCES topics(slug),
//       author VARCHAR(50) NOT NULL REFERENCES users(username),
//       body TEXT NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       votes INT DEFAULT 0,
//       article_img_url VARCHAR(1000)
//       );`)
//   })

//   .then(() => {
//     return db.query(`CREATE TABLE comments (
//       comment_id SERIAL PRIMARY KEY,
//       article_id INT NOT NULL REFERENCES articles(article_id),
//       body TEXT,
//       votes INT DEFAULT 0,
//       author VARCHAR(50) NOT NULL REFERENCES users(username),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );`)
//   })
//   .then(() => {
//     const formattedTopics = topicData.map((topic)=> {
//     return [topic.slug, topic.description, topic.img_url]
//     })

//     const insertTopicsQuery = format(
//     `INSERT INTO topics (slug, description, img_url)
//     VALUES %L;`,
//     formattedTopics
// )
//     return db.query(insertTopicsQuery)
//   })

//   .then(() => {
//     const formattedUsers = userData.map((user) => {
//       return [user.username, user.name, user.avatar_url]
//     })

//     const insertUserQuery = format(
//       `INSERT INTO users (username, name, avatar_url)
//       VALUES %L;`,
//       formattedUsers
//     )
//     return db.query(insertUserQuery)

//   })

//   .then(() => {
//       const formattedArticles = articleData.map((article) => {
//       return [
//         article.title,
//         article.topic,
//         article.author,
//         article.body,
//         article.created_at,
//         article.votes,
//         article.article_img_url
//       ]
//     })

//       const insertArticlesQuery = format(
//       `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url)
//       VALUES %L;`,
//       formattedArticles
//     )
//       return db.query(insertArticlesQuery)
//   })

//       .then(() => {
//       const formattedComments = commentData.map((comment) => {
//       return [
//         comment.article_id,
//         comment.body,
//         comment.votes,
//         comment.author,
//         comment.created_at
//     ]
//   })

//       const insertCommentsQuery = format(
//       `INSERT INTO comments (article_id, body, votes, author, created_at)
//       VALUES %L
//       RETURNING *;`,
//       formattedComments
//     )
//       return db.query(insertCommentsQuery)
//   });

// };


// module.exports = seed;
