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

webApp.get("/api/data", async (req, res) => {
    
    try {
        const users = await userSchema.find({}); // get all data from databse;
        res.send(users).sendStatus(200);
    }catch(error) {

    }
    
});

webApp.get("/api/search", async(req, res) => {
    // return search results based on it
    const {searchThis} = req.query
    const result = await userSchema.find({}); // getting all data and then filtering out the results
    // if the name includes a result then it is a match
    const searchFilteredResults = (getSimilarNames(result, searchThis));
    res.send({results : searchFilteredResults})
})

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

webApp.get("/api/delete", async (req, res) => {
    const {deleteThis} = req.query;
    let flag = true;
    // now split and take both
    const [name, email] = deleteThis.split(" "); // got both ift;
    const findResult = await userSchema.find({name: name, email: email});
    if (findResult) {
        // based on acknowledged deelte and deleteCount set it To something
        const deleteResult = await userSchema.deleteOne({name: name, email: email});
        flag = deleteResult.acknowledged && deleteResult.deletedCount;
    }
    flag ? res.send({message: "done"}) : res.send({message: "failed"});
});

// another one for updating the user
// first find if user exists else move respond with error else success

webApp.post("/api/update", async (req, res) => {
    
    const {id, insert} = req.body; // got the id of user
    const prevEmail = id.split(" ")[1]
    const [name, lastName, email, phone] = insert.split(" ");

    try {
        // updating based ont he email
        // a mistake: updating the data with the previous data whic not updating
        const existResults = await userSchema.updateOne({email: prevEmail}, { $set: { name: name, email: email, phone: phone, lastName: lastName} }); // and now it's officially done fuck yeah
        existResults.matchedCount ? res.send({message: "done"}) : res.send({message: "failed"});
         // an object id
    }catch(error) { console.log(error);}
})
function getSimilarNames(arrayOfObjects, search) {
    // converting it to lowercase first and the search qeury as well
    return arrayOfObjects.filter( (item) => item.name.toLowerCase().includes(search.toLowerCase()))
}

webApp.listen(port, () => console.log("started "));