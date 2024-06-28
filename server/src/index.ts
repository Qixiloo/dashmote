// src/index.ts
import express from 'express';
import {productsrouter} from './products/product.route';
import { Request, Response }  from 'express';

const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(productsrouter)

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});


app.listen(port, function () {
    console.log("Server listening on Port", port);
  });
 

app.get("*", (req: Request, res: Response) => {
    res.send("404! This is an invalid URL.");
  });