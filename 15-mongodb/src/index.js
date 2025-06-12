import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use('/notes', noteRoutes);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Đã kết nối MongoDB thành công!');
    app.listen(port, () => {
      console.log(`Server chạy tại http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Kết nối MongoDB lỗi:', err);
  });
