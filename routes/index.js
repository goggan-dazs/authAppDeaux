var express = require('express');
var router = express.Router();
require('dotenv').config();
const isValidToken = require("../middleware/isValidToken");
const {User} = require('../models');
var axios = require('axios').default;


/* GET home page. */
router.get("/", async function (req, res, next) {
	// GET data from remote API
	// Save as variable

	var config = {
		method: "get",
		url: "https://nashvillecats-814a1-default-rtdb.firebaseio.com/books/-MxbBA3fSa6AGhhlVXNR.json",
		headers: {},
	};

	const book = await axios(config)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
	console.log(book);

	res.render("index", { title: "Express", book });
});

router.get("/login", function (req, res, next) {
	res.render("login");
});

router.get("/register", async function (req, res, next) {
	res.render("register");
});



  

/* GET login page */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/* GET register page */
router.get('/register', (req, res, next) => {
  res.render('register');
});


/* GET profile page */
router.get('/profile/:id', isValidToken, async function(req, res, next) {
  const {id} = req.params;

  const user = await User.findOne({
    where:{
      id: id
    }
  })
  res.render('profile', {name: user.username});
});



module.exports = router;
