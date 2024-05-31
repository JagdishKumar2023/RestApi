const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.get("/users", (req, res) => {
  const html = `
    <ul>
       ${users
         .map(
           (user) => `<li>${user.company_name}</li> <li>${user.industry}</li>`
         )
         .join("")}    
    </ul>
    `;
  res.send(html);
});

// Routes

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:salary", (req, res) => {
  const salary = Number(req.params.salary);
  const user = users.find((user) => user.salary === salary);
  return res.json(user);
});

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
