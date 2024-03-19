const express = require('express');
const mongoose = require('mongoose');
const proveedorRoutes = require('./routes/proveeroute');

const app = express();

app.use(express.json());
app.use('/proveedores', proveedorRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/microProveeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindInistro: DateNN, producto_id: ObjectId (FK)})
