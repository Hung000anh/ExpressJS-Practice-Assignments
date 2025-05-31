import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const users = [
  { id: 1, name: 'Alice', age: 22 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 22 },
  { id: 4, name: 'David', age: 30 },
  { id: 5, name: 'Eve', age: 25 }
];


app.get("/", (req,res) =>
{
    res.send("Hello world");
})

// app.get("/user", (req, res) => {
//     res.send(users)
// })

app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id)
    const user = users.find(u => u.id === id)
    if(user)
    {
        console.log(user)
        res.send(user)
    }
    else
        res.send("not found")
})

app.get("/user", (req, res) => {
  const { age, name } = req.query;

  let filteredUsers = users;

  if (age) {
    filteredUsers = filteredUsers.filter(u => u.age === parseInt(age));
  }

  if (name) {
    filteredUsers = filteredUsers.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
  }

  console.log("Query params:", req.query);
  res.send(filteredUsers);
});
 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
