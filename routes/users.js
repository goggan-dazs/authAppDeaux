var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))
const {User} = require('../models');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
  const {username, password, email} = req.body
  const hash = bcrypt.hashSync(password, saltRounds)

const user = await User.create({
  username: username,
  password: hash,
  email: email
});
res.json({
  id: user.id,
  username: user.username
});
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body // req.body.username, req.body.password
 
const user = await User.findOne({
  where: {
    username: username
  }
});
 if (user){
   //takes our user input password from req.body, uses bcrypt to hash it and checks that that hash is the same as the already hashed password in our db
  const comparePass = bcrypt.compareSync(password, user.password)
  if (comparePass === true) {
    const token = jwt.sign(
      {
        data: user.username
      },
      process.env.SECRET_KEY,
      {expiresIn: "1h"}
    );
    res.cookie("token", token)
   res.redirect(`/profile/${user.id}`);
  } else {
    res.send("Sorry wrong password!")
  }
 } else {
   res.send("Sorry no user found")
 }
})

module.exports = router;
