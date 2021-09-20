const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/userModel");
const UserContact = require("../models/contactModel");

const saltRounds = 10;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userSearch = await User.findOne({ username });

    if (userSearch) {
      res.status(200).json({
        err: "unique username required",
        msg: null,
        success: false,
      });
    } else {
      const salt = await bcrypt.genSalt(saltRounds);

      const hashedPassword = await bcrypt.hash(password, salt);

      const userId = uuidv4();

      const entry = {
        userId,
        username,
        password: hashedPassword,
      };

      const userContact = {
        userId,
        username,
      };

      await UserContact.create(userContact);

      const user = await User.create(entry);

      if (user) {
        res.status(200).json({
          err: null,
          msg: "user created",
          success: true,
        });
      } else {
        res.status(400).json({
          err: "error during register",
          msg: null,
          success: false,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await User.findOne({ username });

    if (findUser) {
      const comparePassword = await bcrypt.compare(password, findUser.password);

      if (comparePassword) {
        const user = {
          userId: findUser.userId,
          username: findUser.username,
        };

        res.status(200).json({
          user,
          success: true,
        });
      } else {
        res.status(200).json({
          success: false,
        });
      }
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
