const { json } = require("express");
var express = require("express");
var router = express.Router();
const pool = require("../db");

router.use(express.json());

/* POST users listing. */
router.post("/", async (req, res, next) => {
  try {
    const { username, password, created_at, updated_at, deleted_at } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, password, created_at, updated_at, deleted_at ) VALUES ($1, $2 $3 $4 $5) RETURNING *",
      [username, password, created_at, updated_at, deleted_at]
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
