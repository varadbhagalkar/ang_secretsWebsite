/*



*******************************USING PASSPORT*************************************



*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});


const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function (req, res) {

});

app.post("/login", function (req, res) {

});









app.listen(3000, function () {
    console.log('Listening on port 3000');
});
