const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const movieRouter = require(path.join(__dirname, 'routes', 'movieRoutes'));
const Token = require(path.join(__dirname, 'models', 'Token'));

// Middleware
app.use(cors());
app.use(express.json());
app.param('token', (req, res, next, val) => {
  if (!Token.findUserToken(val)) {
    res.status(401).json({
      message: "Unauthorized",
    })
    return;
  } else next();
});

// Routes
app.use('/api/v1/:token/movies', movieRouter);
app.use((req, res, next) => {
  res.status(404).json({message: "Route not found"})
})

module.exports = app;