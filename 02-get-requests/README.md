# 📗 Handling GET Requests in ExpressJS

In ExpressJS, **GET requests** are used to retrieve data from the server. They are the most common type of HTTP request and are typically used to fetch resources such as web pages, JSON data, or files.

## 🚦 How to Handle a GET Request

To handle a GET request in Express, use the `.get()` method on your Express app instance. The first argument is the route path, and the second is a callback function that receives the request (`req`) and response (`res`) objects.

### Example

```js
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
```

## 📝 Explanation

- `app.get(path, callback)`: Registers a route handler for GET requests to the specified path.
- `req`: The request object, containing information about the HTTP request.
- `res`: The response object, used to send data back to the client.
- `res.send()`: Sends a response to the client.

## 🔎 Use Cases

- Fetching web pages or HTML content.
- Returning JSON data from an API endpoint.
- Serving static files.

## 🖼️ Preview
![Preview](gif/Preview.gif)