import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
    { id: 1, name: 'Alice' , age: 30 , isEmplayed: true },
    { id: 2, name: 'Bob' , age: 25 , isEmplayed: false },
    { id: 3, name: 'Charlie' , age: 35 , isEmplayed: true },
    { id: 4, name: 'David' , age: 28 , isEmplayed: false },
    { id: 5, name: 'Eve' , age: 22 , isEmplayed: true }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// app.get('/users', (req, res) => {
//     res.send(users);
// });

// app.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     console.log(`Fetching user with ID: ${id}`);
//     const user = users.find(u => u.id === id);
//     if (user) {
//         res.send(user);
//     } else {
//         res.status(404).send({ error: 'User not found' });
//     }

// });

app.get('/users', (req, res) => {
    const { id } = req.query;
    console.log(`Fetching user with ID: ${id}`);
    if (id) {
        const user = users.find(u => u.id === parseInt(id));
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } else {
        res.send(users);
    }
});

app.post('/users', (req, res) => {
    const { name, age, isEmplayed } = req.body;

    if (!name || !age || typeof isEmplayed !== 'boolean') {
        return res.status(400).send({ error: 'Invalid user data' });
    }

    

    const newUser = {
        id: users.length + 1,
        name,
        age,
        isEmplayed
    };
    users.push(newUser);
    res.status(201).send(newUser);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, isEmplayed } = req.body;
    console.log(`Updating user with ID: ${id}`);

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).send({ error: 'User not found' });
    }
    if (!name || !age || typeof isEmplayed !== 'boolean') {
        return res.status(400).send({ error: 'Invalid user data' });
    }

    const updatedUser = {
        id,
        name,
        age,
        isEmplayed
    };

    users[userIndex] = updatedUser;
    console.log(`User with ID: ${id} updated successfully`);
    res.send(updatedUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});