const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Set up Middleware with EJS as the template engine to render dynamic HTML pages
// and configure it to send data from server to web-page/fron-end.

// Middleware
// User Body-Parser to handle incoming form data in both JSON and URL-encoded formats.
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create sample user data
let users = [
  { userUniqueId: "1", userName: "Bruce Wayne", userEmail: "bwayne@gmail.com", userAge: "22" },
  { userUniqueId: "2", userName: "Peter Parker", userEmail: "pparker@gmail.com", userAge: "21" },
  { userUniqueId: "3", userName: "Tony Starks", userEmail: "tstarks@gmail.com", userAge: "28" },
  { userUniqueId: "4", userName: "Clark Kent", userEmail: "ckent@gmail.com", userAge: "31" }
];

// Create routes:
// Route to create user.
// Rout to delet user.
// Rout to modify/update user.

// Home Route - Get/Display Users:
app.get("/", (req, res) => {
  res.render("home", { data: users });
});

// Add User Route:
// When user submits form to add new user,
// the POST route receives the form data via req.body and creates new user.
app.post("/", (req, res) => {
  console.log(req.body);
  const newUser = {
    userUniqueId: req.body.userUniqueId,
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userAge: req.body.userAge
  };

  users.push(newUser);
  res.render("home", { data: users });
});

// Delete User Route:
// When userUniqueId is submitted,
// the system fiters out the user from the user's array
// and then updates the displayed list
app.post('/delete', (req, res) => {
  const requestedUserUniqueId = req.body.userUniqueId;
  users = users.filter(user => user.userUniqueId !== requestedUserUniqueId);

  res.render("home", { data: users });
});

// Update User Route:
// When a user's new details are submitted
// the system updates the users information in the users arrray
// and then re-renders updated users array.
app.post('/update', (req, res) => {
  console.log(req.body);
  users.forEach(user => {
    console.log(req.body);
    if (user.userUniqueId === req.body.userUniqueId) {
      user.userName = req.body.userName;
      user.userEmail = req.body.userEmail;
      user.userAge = req.body.userAge;
    }
  });

  res.render("home", { data: users });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
