import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  avatar: String
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);