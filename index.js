// require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({ "message": "api online" })
})


const listener = app.listen(process.env.PORT || 5000, (listener) => {
    console.log("listening on port: "+listener.address().port)
})

