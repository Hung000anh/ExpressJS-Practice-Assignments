import passport from "passport";
import { Strategy } from "passport-local";
import users from '../utils/constants.mjs'

passport.serializeUser((user, done) => {
  // user là object user tìm được
  console.log("Inside Serialize User");
  console.log(user);
  done(null, user);  // lưu id user vào session
});

passport.deserializeUser((user, done) => {
  // id lấy từ session, dùng để lấy lại user full từ DB hoặc mảng
  console.log("Inside Deserializer");
  try {
    if(!user)
        throw new Error("User Not Found");
    done(null, user)
  } catch (error) {
    done(error, null)
  }
});

passport.use(
    new Strategy( (username, password, done) =>{
        try {
            console.log(`Username: ${username}`);
            console.log(`Password: ${password}`);
            const findUser = users.find((user) => user.username === username)
            if(!findUser)
                throw new Error("User not found");
            if (findUser.password !== password)
                throw new Error("Invalid Credentials");
            else
                done(null, findUser)
        } catch (error) {
            done(error, null)
        }
    })
)

export default passport