const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const userRouter = require("./routers/user.routes");
const todoRouter = require("./routers/todo.routes")
const clientPSQL = require("./db");
app.use(express.json());


clientPSQL.connect((err) => {
  if (err) throw err;
  else {
    console.log(`connect database`);
  }
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api", userRouter);
app.use("/api", todoRouter);

app.listen(port, () => {
  console.log(`server is running ${port} port`);
});
