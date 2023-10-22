import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const port = 2512;
let users = [];
function randomNumber() {
  return Math.floor(Math.random() * 100000000000);
}
app.post("/user", (req, res) => {
  console.log(req.body);
  let newUser = {
    id: randomNumber(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(newUser);
  res.status(201).send("User is created");
});
app.get("/user/:userId", (req, res) => {
  let userId = req.params.userId;
  let isFound = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      res.send(users[i]);
      isFound = true;
      break;
    }
  }
  if (!isFound) {
    res.status(204).send("User not found");
  }
});
app.get("/users", (req, res) => {
  res.send(users);
});

app.put("/user/:userId", (req, res) => {
  res.send("User is modified");
  let userId = req.params.userId;
  let userIndex = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      userIndex = i;
      break;
    }
  }
  if (userIndex === -1) {
    res.status(204).send("User not found");
  } else {
    if (req.body.firstName) {
      users[userIndex].firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      users[userIndex].lastName = req.body.lastName;
    }
    if (req.body.number) {
      users[userIndex].number = req.body.number;
    }
    if (req.body.userName) {
      users[userIndex].userName = req.body.userName;
    }
    if (req.body.email) {
      users[userIndex].email = req.body.email;
    }
    if (req.body.password) {
      users[userIndex].password = req.body.password;
    }
    res.send(users[userIndex]);
  }
});
app.delete("/user/:userId", (req, res) => {
  let userId = req.params.userId;
  let userIndex = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      userIndex = i;
      break;
    }
  }
  if (userIndex === -1) {
    res.status(204);
    res.send("User not found");
  } else {
    users.splice(userIndex, 1);
    res.send("User is deleted");
  }
});

app.delete("/users", (req, res) => {
  users = [];
  res.send("All users deleted");
});

app.get("/", (req, res) => {
  res.send("This is home page running fine");
  console.log("One request is on server");
});

app.get("/profile", (req, res) => {
  res.send(
    "I am Mukarram Latif. I am a MERN Stack and a Full stack Website Application developer"
  );
  console.log("This is request is also on server");
});
app.listen(port, console.log(`This is port ${port} running fine`));
