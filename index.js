const pool = require("./db.js");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to the Database!");
  });
});

const PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
