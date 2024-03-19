const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userroute');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/microUserDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MicroUser service running on port ${port}`);
});
