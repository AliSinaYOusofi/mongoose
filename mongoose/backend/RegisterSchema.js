const mongoose = require("mongoose");

// defining our database schema
const userSchema = new mongoose.Schema({
    /* next: insert validators */
    
    name: {
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
    },
    lastName: {
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
    },
    email: {
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
    },
    phone: {
        required: true,
    }
});

/*
    making custom methods: static, query, virtual, methods, and pre and post middlewars
*/