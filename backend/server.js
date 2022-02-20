const express = require('express');
const recommendations = require('./data/recommendations');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send("API is running..");
});

app.get('/api/recommendations', (req, res) => {
  res.json(recommendations);
})

app.get('/api/recommendations/:id', (req, res) => {
  const recommendation = recommendations.find((n) => n._id === req.params.id);
  res.send(recommendation);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
