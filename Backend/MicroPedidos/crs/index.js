const express = require('express');
const { connectDB } = require('./db/config');
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());


const port = 3001;


app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/api/pedidos', require('./routes/pedidosroute'));

app.listen(port, () => {
  console.log("Server listening on",port);
});
