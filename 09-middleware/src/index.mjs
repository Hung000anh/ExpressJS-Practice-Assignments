import express, { request, response } from 'express'

const app = express();
const PORT = process.env.PORT||3000;
const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 500 },
    { id: 3, name: 'Tablet', price: 300 },
    { id: 4, name: 'Monitor', price: 200 },
    { id: 5, name: 'Keyboard', price: 50 }
];

//middleare global
app.use((request, response, next) =>
{
    console.log('Global Middleware: Request received');
    next();
});


//middleware to log requset details
const logTime = (request, response, next) =>
{
    console.log('request method:', request.method);
    console.log('request Time:', new Date().toLocaleString());
    next(); // Call the next middleware or route handler
};

app.get("/", (request,response)=>
{
    response.send("Welcome to the Product API");
});


app.get("/products", logTime, (request, response) => {
    response.send(products);
});


app.listen(PORT, () =>
{
    console.log(`Server is running on http://localhost:${PORT}`);
});