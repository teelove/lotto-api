import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

config();

const app = express();

// create application/json parser
const jsonParser = bodyParser.json();

app.use(cors());

const connection = mysql.createConnection(process.env.DATABASE_URL || "");

app.all('/', (req: Request, res: Response) => {
  console.log('Just got a request!');
  res.send('Yo!');
});

app.get('/locationarrest', (req: Request, res: Response) => {
  connection.query(
    'SELECT * FROM LocationArrestTB',
    (err: any, results: any, fields: any) => {
      console.log(results);
      res.send(results);
    },
  );
});

app.post('/register', jsonParser, (req: Request, res: Response, next: any) => {
  connection.execute(
    'INSERT INTO LocationArrestTB (LocationArrest) VALUES (?)',
    [req.body.LocationArrest],
    (err: any, results: any, fields: any) => {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok' });
      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
    },
  );
  // execute will internally call prepare and query
});

app.post(
  '/insertlocationarrest',
  jsonParser,
  (req: Request, res: Response, next: any) => {
    connection.execute(
      'INSERT INTO LocationArrestTB (LocationArrest) VALUES (?)',
      [req.body.LocationArrest],
      (err: any, results: any, fields: any) => {
        if (err) {
          res.json({ status: 'error', message: err });
          return;
        }
        res.json({ status: 'ok' });
        // If you execute same statement again, it will be picked from a LRU cache
        // which will save query preparation time and give better performance
      },
    );
    // execute will internally call prepare and query
  },
);

app.listen(process.env.PORT || 3002);

// connection.end();
