const { json } = require("express");
var express = require("express");
var router = express.Router();
const pool = require("../db");

router.use(express.json());

/**
 * @api {post} /users/new Create a new user
 * @apiVersion 1.0.0
 * @apiDescription Create a new user
 * @author martinwachira
 */
router.post("/new", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, status ) VALUES ($1, $2, $3, 1) RETURNING *",
      [username, email, password]
    );
    res.json(newUser.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * GET users listing.
 * @param {string} username
 * @param {string} password
 * @returns {object} user *
 *
 */
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

/**
 * @api {get} /users/:id Get user details
 * @apiVersion 1.0.0
 * @apiDescription Get user details
 * @apiParam {Number} id User id
 */
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

/**
 * @api {put} /users/:id Update user details
 * @apiVersion 1.0.0
 * @apiDescription Update user details
 * @apiParam {Number} id User id *
 */

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, status } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET username = $1, email = $2, password = $3, status = $4 WHERE user_id = $5",
      [username, email, password, status, id]
    );
    res.json("user udated successfully");
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @api {delete} /users/:id Delete user
 * @apiVersion 1.0.0
 * @apiDescription Delete user
 * @apiParam {Number} id User id *
 */

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const deleteUser = await pool.query(
      "UPDATE users SET status = 0 WHERE user_id = $1",
      [id]
    );
    res.json("user deleted succcessfully");
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @api {cascade} /users/:id Delete user
 * @apiVersion 1.0.0
 * @apiDescription Cascade user
 * @apiParam {Number} id User id *
 */

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );
    res.json("user permanently deleted succcessfully");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
