# NC News Backend

A RESTful API for a news application built with Express.js and PostgreSQL. This project serves as the backend for the NC News frontend and provides endpoints to fetch, create, update, and delete articles, comments, users, and topics.

## Tech Stack

- Node.js  
- Express.js  
- PostgreSQL  
- pg (node-postgres)  
- Jest & Supertest (for testing)

## Features

- Retrieve all articles with comment counts  
- Filter articles by topic  
- Sort articles by date, topic, or comment count  
- Post and delete comments  
- API-level error handling with meaningful status codes

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Yan2992/be-nc-news.git
cd be-nc-news
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create two `.env` files in the root directory:

- `.env.development`
- `.env.test`

Each file should contain your PostgreSQL connection string. For example:

```
DATABASE_URL=postgres://your_username:your_password@localhost:5432/nc_news
```

For the test environment:

```
DATABASE_URL=postgres://your_username:your_password@localhost:5432/nc_news_test
```

> Replace `your_username` and `your_password` with your actual PostgreSQL credentials.

### 4. Set up the databases

```bash
npm run setup-dbs
```

### 5. Seed the development database

```bash
npm run seed
```

### 6. Start the development server

```bash
npm run dev
```

### 7. Run tests

```bash
npm test
```

---

## API Endpoints

- `GET /api/topics` – fetches all topics  
- `GET /api/users` – fetches all users  
- `GET /api/articles` – fetches all articles (with optional sorting and filtering)  
- `GET /api/articles/:article_id` – fetches a specific article by ID  
- `PATCH /api/articles/:article_id` – updates the vote count for a specific article  
- `GET /api/articles/:article_id/comments` – fetches all comments for a specific article  
- `POST /api/articles/:article_id/comments` – adds a comment to a specific article  
- `DELETE /api/comments/:comment_id` – deletes a specific comment by ID  

---

🔗 Related Repositories

Backend Repo – fe-nc-news -> https://github.com/Yan2992/fe-nc-news

👤 Author
GitHub – @Yan2992

LinkedIn – Yan Bulavintsev

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by Northcoders
