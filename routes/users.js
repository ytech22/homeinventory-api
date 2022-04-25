const { json } = require("express");
var express = require("express");
var router = express.Router();
const pool = require("../db");

router.use(express.json());

/* POST users listing. */
router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, password ) VALUES ($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newUser.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* GET users listing. */
router.get("/", async (req, res, next) => {
  // res.send("respond with a resource");
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
