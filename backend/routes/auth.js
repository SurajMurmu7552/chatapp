const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/userModel");
const UserContact = require("../models/contactModel");

const saltRounds = 10;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const find = User.find({ username });

    if (find.username) {
      res.status(200).json({
        err: "unique username required",
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
          msg: "user created",
        });
      } else {
        res.status(400).json({
          err: "error",
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
    const user = await User.findOne({ username });

    if (!user) {
      res.status(200).json({
        err: "wrong credentials",
      });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      const data = {
        userId: user.userId,
        username: user.username,
      };

      res.status(200).json({
        data,
        msg: "welcome user",
        success: true,
      });
    } else {
      res.status(200).json({
        err: "wrong credentials",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
