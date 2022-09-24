//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });

        newUser.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.render('secrets');
            }

        });
    });

});

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password =

        User.findOne({ email: username }, function (err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                console.log(foundUser)
                if (foundUser) {
                    bcrypt.compare(password, foundUser.password, function (err, result) {
                        if (result) {
                            res.render('secrets')
                        }
                    });
                }

            }
        });

});









app.listen(3000, function () {
    console.log('Listening on port 3000');
});
