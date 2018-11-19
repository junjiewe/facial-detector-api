const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controller/register");
const signin = require("./controller/signin");
const profile = require("./controller/profile");
const image = require("./controller/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "facial-detector"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

//basic route
app.get("/", (req, res) => {
  res.send("It's working");
});

//sign in
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//register
app.post("/register", (req, res) => {
  register.handleReg(req, res, db, bcrypt);
}); //dependency injection

//profile
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

//image, change the score so use put
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running fine on ${process.env.PORT}`);
});
