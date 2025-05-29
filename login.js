const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Use a real secret key (in production, store it in an environment variable)
const SECRET_KEY = 'my_super_secret_123';

// Middleware to parse JSON
app.use(bodyParser.json());

// Dummy user
const dummyUser = {
  id: 1,
  email: 'test@example.com',
  password: 'password123'
};

// POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (email === dummyUser.email && password === dummyUser.password) {
    const token = jwt.sign({ id: dummyUser.id, email }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// GET /dashboard (protected route)
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to dashboard', user: req.user });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(403).json({ message: 'Token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
