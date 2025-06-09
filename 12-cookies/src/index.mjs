import express from 'express'
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(cookieParser());

const products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Smartphone', price: 600 },
  { id: 3, name: 'Tablet', price: 400 },
];

// Xem danh sách sản phẩm
app.get('/products', (req, res) => {
  res.json(products);
});

// Xem chi tiết sản phẩm & lưu vào cookie 'viewed'
app.get('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) return res.status(404).send('Product not found');

  // Đọc cookie hiện tại
  let viewed = req.cookies.viewed || [];

  // Nếu chưa có, khởi tạo mảng
  if (typeof viewed === 'string') viewed = JSON.parse(viewed);

  // Thêm sản phẩm nếu chưa có trong cookie
  if (!viewed.includes(productId)) viewed.push(productId);

  // Lưu lại cookie
  res.cookie('viewed', JSON.stringify(viewed), { maxAge: 3600000 }); // 1 giờ

  res.json(product);
});

// Lấy danh sách sản phẩm đã xem
app.get('/viewed', (req, res) => {
  let viewed = req.cookies.viewed || [];

  if (typeof viewed === 'string') viewed = JSON.parse(viewed);

  const viewedProducts = products.filter(p => viewed.includes(p.id));

  res.json(viewedProducts);
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
