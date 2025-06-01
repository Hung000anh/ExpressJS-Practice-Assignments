import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [
    { id: 1, name: 'Alice', age: 22 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 22 },
    { id: 4, name: 'David', age: 30 },
    { id: 5, name: 'Eve', age: 25 }
];

app.get("/", (req, res) => {
    res.send("Hello world");
});

// app.get("/user", (req, res) => {
//     res.send(users);
// });

app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const user = users.find(u => u.id === id);
    if (user) {
        console.log(user);
        res.send(user);
    } else {
        res.status(404).send("User not found");
    }
});

app.get("/user", (req, res) => {
    const { age, name } = req.query;
    console.log("Query params:", req.query);

    // Filter users based on query parameters
    let filteredUsers = users;

    if (age) {
        filteredUsers = filteredUsers.filter(u => u.age === parseInt(age));
    }

    if (name) {
        filteredUsers = filteredUsers.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    }

    
    res.send(filteredUsers);
})

app.post("/user", (req, res) => {
    const info = req.body;
    console.log("New info data:", info);

    // Validate the new user data
    if (!info.name || !info.age) {
        return res.status(400).send("Name and age are required");
    }

    // Assign a new ID
    info.id = info.length ? users[users.length - 1].id + 1 : 1;

    const newUser = {
        id: info.id,
        name: info.name,
        age: info.age
    }; 

    // Add the new user to the array
    users.push(newUser);
    
    res.status(201).send(newUser);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});