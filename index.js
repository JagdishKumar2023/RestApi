const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware - Plugin (Next is new one)
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log("Hello from middleware 1");
  req.myUserName = "piyushgarg.dev";
  // return res.json({ msg: "Hello from Middleware 1" });
  next();
});

// app.use((req, res, next) => {
//   // return res.json({ msg: "Hello from Middleware 2", req.myUserName });
//   console.log("Hello from middleware 2", req.myUserName);
//   next();
// });

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
  next();
});

// app.use((req, res, next) => {
//   // return res.json({ msg: "Hello from Middleware 2", req.myUserName });
//   // db query
//   // credit card Info
//   req.creditCardNumber = "1234";
//   console.log("Hello from middleware 2", req.myUserName);
//   next();
// });

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
