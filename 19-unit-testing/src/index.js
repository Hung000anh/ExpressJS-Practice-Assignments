const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes'); // Đường dẫn đúng tới file router của bạn

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

module.exports = app;
