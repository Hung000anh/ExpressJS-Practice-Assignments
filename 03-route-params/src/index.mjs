import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const users = [
  { id: "1", name: "Nguyen Van A" },
  { id: "2", name: "Tran Thi B" },
  { id: "3", name: "Le Van C" },
];

app.get("/", (req, res) => {
  res.send("hello world ");
});

app.get("/user", (req, res) => {
  res.send(users);
});


app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id)
  if(user)
  {
    res.send(user)
  }
  else
  {
    res.status(404).send("Not found")
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
