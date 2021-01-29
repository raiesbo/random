require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requrieAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); // allows us to access to cookies from any of our url

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log("db connected"))
	.catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requrieAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)






app.listen(process.env.PORT || 3000)