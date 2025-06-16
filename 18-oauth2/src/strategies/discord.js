import passport from 'passport'
import { Strategy as DiscordStrategy } from 'passport-discord' 
import dotevn from  'dotenv'
import User from '../models/User.js';
dotevn.config()

passport.serializeUser((user, done) => {
    console.log("Serialize User")
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    console.log("Deserialize User")
    done(null, obj);
});  

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/discord/redirect',
  scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const { id, username, avatar } = profile;

    const user = await User.findOneAndUpdate(
      { discordId: id },
      { username, avatar },
      { upsert: true, new: true }
    );

    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err, null);
  }
}));

