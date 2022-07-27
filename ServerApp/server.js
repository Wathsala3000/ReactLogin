require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const dbconnection = require("./db");

//db connection
dbconnection.db();

//middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log(`listning on port ${port}...`));
