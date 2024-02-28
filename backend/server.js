const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.SQL_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.post("/verifyUser", (req, res) => {
  const query = `SELECT * FROM Users 
        WHERE Email = "${req.body.userEmail}" AND Password = "${req.body.password}";`;
  db.execute(query, (err, sql_output) => {
    if (err) res.status(500).send(err);
    else if (sql_output.length) {
      res.status(200).send(sql_output[0]);
    } else {
      res.status(401).send("Invalid");
    }
  });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});