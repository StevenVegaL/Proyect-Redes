const express = require('express');
const { connectDB } = require('./db/config');
const morgan = require("morgan");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());

const port = 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/api/users', require('./routes/userroute'));

app.listen(port, () => {
  console.log("Server listening on",port);
});