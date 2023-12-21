const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extend: true }));

app.listen(port, () => {
    console.log("Server is running on port 3000");
});

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDb", err);
    });

app.use("/api/products", productRouter);
app.use("/", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
