import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;

// Middleware để đọc JSON body
app.use(express.json());

// Middleware để dùng session và lưu vào MongoDB
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 ngày
  }
}));

// Routes
app.use("/users", userRoutes);

// Kết nối MongoDB và khởi động server
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("✅ Has connected MongoDB successfully!");
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Connect MongoDB error', err);
  });

// Route mặc định
app.get("/", (req, res) => {
  res.send("Hello world");
});
