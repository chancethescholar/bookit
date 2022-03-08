const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running..");
});

app.use('/api/users', userRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
