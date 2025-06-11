import express, { request, response } from 'express'
import usersRouter  from './routes/users.mjs'
import session from 'express-session'
import passport from 'passport'
import './strategies/local-strategy.mjs'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(usersRouter);
app.post(
  "/api/auth", 
  passport.authenticate("local"),
  (req, res) => {
    console.log("Body nhận được:", req.body);
    console.log("User sau khi đăng nhập:", req.user);
    console.log("Session hiện tại:", req.session);
    res.json({ message: "Login thành công!", user: req.user });
  }
);

app.get("/api/auth/status", (request, response) => {
  console.log("Inside /api/auth/status endpoint");
  console.log("User sau khi đăng nhập:", request.user);
  console.log("Session hiện tại:", request.session);
  return request.user ? response.send(request.user) : response.sendStatus(401);
  }
)

app.get("/api/logout", (request, response) => {
  request.logout((err) => {
    if (err) {
      console.error("Lỗi khi logout:", err);
      return response.status(500).send("Lỗi khi đăng xuất");
    }
    else
      response.json({ message: "Đăng xuất thành công!" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});