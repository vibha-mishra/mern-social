const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// router.get("/register",async (req, res) => {
//   const user= await new User({
//       username:"john",
//       email:"john@gmail.com",
//       password:"123456"
//   })
//   await user.save();
//   res.send("ok")
// });
// /**----------------REGISTER ---------*/
router.post("/register", async (req, res) => {
  try {
    //-----Generate password------//
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //-------Create New User------//
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //-----Save User and return Response-----//
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    //   console.log(err);
    return res.status(500).json(err);
  }
});
// /**The async function declaration defines an asynchronous function, which returns an AsyncFunction object.
// When an async function is called, it returns a Promise.
// When the async function returns a value, the Promise will be resolved with the returned value.
// When the async function throws an exception or some value, the Promise will be rejected with the thrown value.
// An async function can contain an await expression, that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the async function's execution and returns the resolved value.
// The keyword await makes javaScript wait until that promise settles and returns its result.  */

// //-----------LOGIN-----------------//
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    //checking whether user exists
    !user && res.status(404).json("User not found");

    //checking whether password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
