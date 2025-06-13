import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  age: { type: Number, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;