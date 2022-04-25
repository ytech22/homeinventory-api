const { json } = require("express");
var express = require("express");
var router = express.Router();
const pool = require("../db");

router.use(express.json());

/* POST users listing. */
router.post("/new", async (req, res, next) => {
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
    console.log("users", users.rows);
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* GET user. */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("user id =", id);
    const user = await pool.query("SELECT * FROM users where user_id = $1", [
      id,
    ]);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
