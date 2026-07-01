# 🔐 Node.js Authentication API

A simple and secure authentication backend built with **Node.js**, **Express.js**, **MySQL**, **JWT**, and **bcrypt**.

## 🚀 Features

- User Registration
- User Login
- Protected Routes
- User Logout
- JWT Authentication
- Password Hashing with bcrypt
- HTTP-Only Cookies
- MySQL Database
- Environment Variables

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcrypt
- cookie-parser
- dotenv
- cors

---

## 📁 Project Structure

```
backend/
│
├── config/
│   └── db.js
│
├── middleware/
│   └── verifyToken.js
│
├── routes/
│   ├── signup.js
│   ├── login.js
│   ├── profile.js
│   └── logout.js
│
├── index.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation

```bash
git clone https://github.com/NaniGudivaka/backend-login-authentication-with-node.js.git

cd backend

npm install
```

Create a `.env` file.

```env
PORT=----

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database

JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm start
```

or

```bash
npm run dev
```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/signup | Register a new user |
| POST | /auth/login | Login user |
| GET | /auth/profile | Protected profile route |
| POST | /auth/logout | Logout user |

---

## 🔒 Authentication Flow

- Register a new account
- Password is hashed using bcrypt
- Login generates a JWT
- JWT is stored in an HTTP-only cookie
- Protected routes verify the token
- Logout clears the authentication cookie

---

## 📌 Security

- Password Hashing
- JWT Authentication
- HTTP-Only Cookies
- Environment Variables
- Parameterized SQL Queries

---

## 👨‍💻 Author

## NANI GUDIVAKA ##