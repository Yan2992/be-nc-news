# NC News Backend

A RESTful API for a news application built with **Express.js** and **PostgreSQL**. This project serves as the backend for the [NC News frontend](https://github.com/Yan2992/fe-nc-news) and provides endpoints to fetch, create, update, and delete articles, comments, users, and topics.

---

## 🧰 Tech Stack

- Node.js  
- Express.js  
- PostgreSQL  
- pg (node-postgres)  
- Jest & Supertest (for testing)

---

## ✨ Features

- Retrieve all articles with comment counts  
- Filter articles by topic  
- Sort articles by date, topic, or comment count  
- Post and delete comments  
- API-level error handling with meaningful status codes

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository


git clone https://github.com/Yan2992/be-nc-news.git
cd be-nc-news

2. Install dependencies

npm install

3. Set up environment variables

Create two .env files in the root directory:

.env.development

.env.test

Each should contain the appropriate PostgreSQL connection string:

DATABASE_URL=postgres://<your_username>:<your_password>@localhost:5432/nc_news

For testing:
DATABASE_URL=postgres://<your_username>:<your_password>@localhost:5432/nc_news_test

🔐 Replace <your_username> and <your_password> with your actual PostgreSQL credentials.

4. Set up the databases

npm run setup-dbs

5. Seed the development database

npm run seed


6. Start the development server

npm run dev


7. Run the tests

npm test


🔗 Related Repositories
Frontend Repo – fe-nc-news -> https://github.com/Yan2992/be-nc-news

👤 Author
GitHub – @Yan2992

LinkedIn – Yan Bulavintsev

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by Northcoders
