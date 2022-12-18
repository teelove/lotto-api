const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();

app.use(cors());

const connection = mysql.createConnection(process.env.DATABASE_URL);

app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Yo!");
});

app.get("/locationarrest", (req, res) => {
  connection.query(
    "SELECT * FROM LocationArrestTB",
    function (err, results, fields) {
      console.log(results);
      res.send(results);
    }
  );
});




app.post("/insertlocationarrest", function(req, res) {
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the database.');

    const sql = 'INSERT INTO LocationArrestTB (LocationArrest) VALUES (?)';
    const values = [req,];
    

    connection.execute(sql, values, function (err, result) {
      if (err) throw err;
      console.log('Inserted new row with ID:', result.insertId);
      res.send('Inserted new user with ID: ' + result.insertId);
    });
  });
});





app.listen(process.env.PORT || 3002);

//connection.end()
