require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const connectWithDb = require("./config/db");

// connect with databases
connectWithDb();

const postRoutes = require('./routes/posts');
const userRouter = require("./routes/user.js");

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());



app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.get('/', (req, res) => {
    res.send('Hello to stock app')
})
// connect with databases

const PORT = process.env.PORT || 4000;


app.listen(4000, () => {
    console.log(`Server is running at port: ${PORT}`);
});
