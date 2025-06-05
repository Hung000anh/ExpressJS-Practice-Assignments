import express, { request, response } from 'express'

const app = express();
const PORT = process.env.PORT||3000

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

app.get('/', (request, response) => 
{
    response.send('Hello world');
})

app.get('/users', (request, response) =>
{
    response.send(users);
})

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`Received path request for user ID: ${id}`);

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).send(`User with ID ${id} not found`);
    }

    users.splice(userIndex, 1); // Remove user from the array
    res.send(`User with ID ${id} deleted successfully`);
});



app.listen(PORT, () => 
{
   console.log(`Server is running on http://localhost:${PORT}`); 
});