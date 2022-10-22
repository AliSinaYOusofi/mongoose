const express = require("express");
const webApp = express();
const cors = require("cors");

const port = 30001;

webApp.use(express.json());
// allow cross-origin request sharing
webApp.use(cors({
    origin: "http://localhost:/3000",
    credentials: true
}));

