const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();


// create application/json parser
var jsonParser = bodyParser.json();

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

app.post("/register", jsonParser, function (req, res, next) {
    connection.execute(
      "INSERT INTO LocationArrestTB (LocationArrest) VALUES (?)",
      [req.body.LocationArrest],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
        // If you execute same statement again, it will be picked from a LRU cache
        // which will save query preparation time and give better performance
      }
    );
  // execute will internally call prepare and query
});



app.post("/insertlocationarrest", jsonParser, function (req, res, next) {
  connection.execute(
    "INSERT INTO LocationArrestTB (LocationArrest) VALUES (?)",
    [req.body.LocationArrest],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
    }
  );
// execute will internally call prepare and query
});





app.listen(process.env.PORT || 3002);

//connection.end()
