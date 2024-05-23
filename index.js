const express = require("express");
const app = express();
const PORT = 3000;
const users = require("./MOCK_DATA.json");
app.use(express.urlencoded({ extended: false }));
const fs = require("fs");

app.get("/users", (req, res) => {
  const html = `<ul>
${users.map((user) => `<li>${user.first_name}</li>`).join("")}
</ul>`;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.send(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    let id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.send(user);
  })
  .patch((req, res) => {
    //logic
    return res.json({
      process: "pending",
    });
  })
  .delete((req, res) => {
    //logic
    return res.json({
      process: "pending",
    });
  });

app.post("/api/users", (req, res) => {
  //logic
  const body = req.body;

  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "success",
      id: users.length,
    });
  });
  // console.log("BODY", body);
});
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
