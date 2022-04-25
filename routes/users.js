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
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
  }
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
