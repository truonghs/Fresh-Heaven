const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
const productRouter = require('./routes/products');
const port = 3000;

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('db connected'))
  .catch(err => console.log('db fail', err));

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extend: true}));

app.use('/api/products', productRouter);
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);

const axios = require('axios');

// axios.get("http://localhost:3000/api/products/")

// .then((res) => console.log(res))
const fetchData = async () => {
  await axios.get('http://localhost:3000/api/products/').then(response => {
    console.log(response.data)
  });
};

fetchData();
