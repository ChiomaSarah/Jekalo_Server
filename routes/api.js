const express = require("express");

const router = express.Router();

const pool = require("../db");

const jsonParser = express.json();

//get all users from the API
router.get("/users", async (req, res) => {
  try {
    await pool.query("Select * from credentials", (err, result) => {
      if (!err) {
        return res.json({
          status: 200,
          message: "Request successful... Users Retrieved!",
          data: result.rows,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  pool.end;
});

//create a new user
router.post("/user", jsonParser, async (req, res) => {
  try {
    let data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      date_of_birth: req.body.date_of_birth,
    };

    const user = await pool.query(
      "SELECT * FROM credentials WHERE username = $1",
      [data.username]
    );

    if (user.rows.length !== 0) {
      return res.status(409).json({
        error: "Username taken... Please, provide a unique username!",
      });
    }

    const insertQuery =
      "INSERT INTO credentials(first_name, last_name, username, date_of_birth) VALUES($1,$2,$3,$4) RETURNING *";
    const values = [
      data.first_name,
      data.last_name,
      data.username,
      data.date_of_birth,
    ];

    await pool
      .query(insertQuery, values)
      .then((result) => {
        newUser = result.rows[0];

        return res.status(201).send({
          status: "success",
          data: {
            newUser,
          },
        });
      })

      .catch((error) => {
        return res.status(500).send({
          message: "Failed to register user!",
          error,
        });
      });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  pool.end;
});

//delete a user
router.delete("/user/:id", async (req, res) => {
  try {
    let insertQuery = `delete from credentials where user_id=${req.params.id}`;

    await pool.query(insertQuery, (err, result) => {
      if (!err) {
        return res.json({
          status: 204,
          message: "Request succesful... User Deleted!'",
        });
      } else {
        return res
          .status(404)
          .json({ error: "Request failed... User doesn't exist!" });
      }
    });
  } catch {
    return res
      .status(404)
      .json({ error: "Request failed... User doesn't exist!" });
  }
  pool.end;
});

module.exports = router;
