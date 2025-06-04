import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [
    { id: 1, name: 'Alice' , age: 30 , isEmployed: true },
    { id: 2, name: 'Bob' , age: 25 , isEmployed: false },
    { id: 3, name: 'Charlie' , age: 35 , isEmployed: true },
    { id: 4, name: 'Diana' , age: 28 , isEmployed: false },
    { id: 5, name: 'Eve' , age: 22 , isEmployed: true },
    { id: 6, name: 'Frank' , age: 40 , isEmployed: false },
    { id: 7, name: 'Grace' , age: 32 , isEmployed: true },
    { id: 8, name: 'Hank' , age: 29 , isEmployed: false },
    { id: 9, name: 'Ivy' , age: 27 , isEmployed: true },
    { id: 10, name: 'Jack' , age: 31 , isEmployed: false }
];

app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    console.log('Params:', req.params);
    res.send(`You requested user ID: ${req.params.id}`);
});

app.patch('/users/:id', (req, res) => {
    const { body, params: { id } } = req;
    console.log(`Received PATCH request for user ID: ${id}`, body); // oject destructuring
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return res.status(404).send(`User with ID ${id} not found`);
    }
    // Update user properties based on the request body
    if (body.name !== undefined) user.name = body.name;
    if (body.age !== undefined) user.age = body.age;
    if (body.isEmployed !== undefined) user.isEmployed = body.isEmployed;
    res.send(`User with ID ${id} updated successfully: ${JSON.stringify(user)}`);

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});