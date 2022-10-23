const express = require("express");
const router = express.Router();
const webApp = express();
const cors = require("cors");
const mongoose = require("mongoose");

// connecting the database
mongoose.connect("http://localhost/programmers");

const port = 3001;

webApp.use(express.json());
// allow cross-origin request sharing
webApp.use(cors({
    origin: true, // not http://localhost:3001 be true
    credentials: true
}));
 
webApp.use("/", router);

webApp.post("/api/register", (req, res) => {
    const {name, lastName, email, phone} = req.body; // got the data just insert it

});

webApp.listen(port, () => console.log("started "));