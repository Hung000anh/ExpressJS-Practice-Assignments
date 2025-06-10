import express from 'express'
import session from 'express-session'
import cookie from 'cookie-parser'


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 5 // 5 phút
  }
}));

// Dữ liệu người dùng mô phỏng
const fakeUsers = [
  { username: 'admin', password: '1234' },
  { username: 'guest', password: 'abcd' }
];

// Trang chủ
app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`Chào ${req.session.user.username}! <a href="/logout">Đăng xuất</a>`);
  } else {
    res.send(`<form method="POST" action="/login">
                <input name="username" placeholder="Username" required/>
                <input name="password" type="password" placeholder="Password" required/>
                <button type="submit">Đăng nhập</button>
              </form>`);
  }
});

// Xử lý đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = fakeUsers.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = { username: user.username }; // Lưu thông tin user vào session
    res.redirect('/');
  } else {
    res.send('Sai tên đăng nhập hoặc mật khẩu. <a href="/">Thử lại</a>');
  }
});

// Đăng xuất
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Lỗi đăng xuất');
    res.clearCookie('connect.sid'); // Xóa cookie session
    res.redirect('/');
  });
});

// Chạy server
app.listen(3000, () => {
  console.log('Server chạy tại http://localhost:3000');
});