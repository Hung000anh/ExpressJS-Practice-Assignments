import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import './strategies/discord.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;

// Middleware để đọc JSON body
app.use(express.json());

// Middleware để dùng session và lưu vào MongoDB
app.use(session({
  secret: process.env.SESSION_SECRET,
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

app.use(passport.initialize());
app.use(passport.session());

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


app.get("/api/auth/status", (req, res)=>{
    console.log("===");
    console.log(req.user);
    console.log(req.session);
    console.log(req.sessionID);
    return req.user ? res.send(req.user) : res.sendStatus(401);

})

// Bắt đầu đăng nhập
app.get('/auth/discord', passport.authenticate('discord'));

// Callback sau khi Discord redirect về
app.get('/auth/discord/redirect', passport.authenticate('discord', {
  failureRedirect: '/'
}), (req, res) => {
  // Nếu thành công, chuyển hướng về trang trạng thái
  res.redirect('/api/auth/status');
});

// Đăng xuất
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});