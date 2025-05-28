import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.get('/api/users', (req, res) => {
    res.send([{id: 1, name: 'John Doe'}, {id: 2, name: 'Jane Doe'}]);    
})

app.get('/api/products', (req, res) => {
    res.send([
        {id: 1, name: 'Laptop', price: 999.99},
        {id: 2, name: 'Smartphone', price: 499.99},
        {id: 3, name: 'Tablet', price: 299.99}
    ]);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})