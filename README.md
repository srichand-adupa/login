# login

📦 To run this app:

npm init -y
npm install express body-parser jsonwebtoken
node login.js


🧪 How to Test with Postman
1. Login
Method: POST

URL: http://localhost:3000/login

Body (raw JSON):

{
  "email": "test@example.com",
  "password": "password123"
}


2. Access Protected Route
Method: GET

URL: http://localhost:3000/dashboard

Headers:

Authorization: Bearer <your_token_from_login_response>
