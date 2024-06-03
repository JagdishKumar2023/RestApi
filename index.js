const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

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

app.get("/api/users/", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/")
  .get((req, res) => {
    const salary = Number(req.params.salary);
    const user = users.find((user) => user.salary === salary);
    return res.json(user);
  })
  .patch((res, req) => {
    // Edit user with id
    return res.json({ status: "Pending" });
  })
  .delete((res, req) => {
    // Delete user with id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  // TODO: Create new user
  const body = req.body;
  users.push({ ...body, id: users.length });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
  // console.log("Body", body);
  // return res.json({ status: "Pending" });
});

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
