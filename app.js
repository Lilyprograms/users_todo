const express = require("express");
const app = express();
const cors = require("cors");
const DB_INIT = require("./config/DB_INIT");
const userRoute = require("./routes/userRoutes");
const todoRoute = require("./routes/todoRoutes");
require("dotenv").config();

DB_INIT();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/todo", todoRoute);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Server Running`);
  }
});
