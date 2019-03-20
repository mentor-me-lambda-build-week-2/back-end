require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const users = require('./routes/users-router.js');
const register = require('./routes/register-router.js');
const questions = require('./routes/questions-router.js');
const answers = require('./routes/answers-router.js');
const login = require('./routes/login-router.js');
const tags = require('./routes/tags-router.js');

const errors = require('./middleware/errors');

server.use(express.json());
server.use(helmet());
server.use(
  cors({
    origin: ['http://localhost:3000', 'https://mentorme-frontend.netlify.com'],
    credentials: true,
  }),
);

// base endpoints here
server.get('/', (req, res) => {
  res.send('API running...');
});

server.use('/api/users', users);
server.use('/api/register', register);
server.use('/api/login', login);
server.use('/api/questions', questions);
server.use('/api/tags', tags);
server.use('/api/answers', answers);

server.get('/api', (req, res) => {
  res.status(200).json({
    message: `API Running! in environment ${process.env.ENVIRONMENT}`,
  });
});

// error handling
server.use(errors);
// not found - 404
server.use((req, res) => {
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

const PORT = 3000;
server.listen(
  PORT,
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
);
