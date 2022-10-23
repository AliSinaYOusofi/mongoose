const express = require("express");
const router = express.Router();
const webApp = express();
const cors = require("cors");
const mongoose = require("mongoose");
// getting our schema
const userSchema = require("./RegisterSchema");

// connecting the database
mongoose.connect("mongodb://localhost/programmers");

const port = 3001;

webApp.use(express.json());
// allow cross-origin request sharing
webApp.use(cors({
    origin: true, // not http://localhost:3001 be true
    credentials: true
}));
 
webApp.use("/", router);

webApp.post("/api/register", async (req, res) => {
    const {name, lastName, email, phone} = req.body; // got the data just insert it
    // and now saving data to databse: everything else is set
    // RegisterSchema is Done Good
    // have to get the error message from when inserting duplicate items: which an email
    
    // send a message base on flag;
    let flag = true;
    try {
        const result = await userSchema.insertMany({name : name, lastName: lastName, email: email, phone: phone});
    }catch(error) {
        console.log(error.errmsg); // the error for duplicate keys
        flag = false;    
    }
    
    flag ? res.send({message: "done"}) : res.send({message: "failed"});
});

webApp.listen(port, () => console.log("started "));