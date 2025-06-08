import express from 'express';
import userRouter from './routers/users.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount router ở đây
app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
