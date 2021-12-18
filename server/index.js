require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const connectWithDb = require("./config/db");


// connect with databases
connectWithDb();


const postRoutes = require('./routes/posts');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

// connect with databases

const PORT = process.env.PORT || 5000;


app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});