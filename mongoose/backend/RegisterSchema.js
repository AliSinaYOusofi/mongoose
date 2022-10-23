const mongoose = require("mongoose");
const { stringify } = require("querystring");

// defining our database schema
const userSchema = new mongoose.Schema({
    /* next: insert validators */

    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
    },
    lastName: {
        type : String,
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
        validate: {
            validator : value => String(value).length > 0,
            message: props => `${props}} should be greater than zero`
        },
        immutable: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
    }
});

/*
    making custom methods: static, query, virtual, methods, and pre and post middlewars
*/

// define inside the methods our custom methods
userSchema.methods.getAllCurrentInfo = function() {
    return `${this.name} ${this.lastName} ${this.email} ${this.phone}`
}

// define methods inside statics
// defining static methods
// basically for the whole model
userSchema.statics.findByEmail = function(email){
    return this.find({email : new RegExp(email, 'i')})
}

// creating virtual methods
// which is not sotred inside our database
// it is just inside our code that's cool

userSchema.virtual("nameAndEmail").get( function () {
    return `${this.name} has an email : ${this.email}`
});

userSchema.virtual("lastNamePhone").set(function () {
    return `${this.lastName} has phone of : ${this.phone}`
});

// and creating our middleware
// first of the pre
userSchema.pre("save", function(next) {
    // doc is our document/table
    // next: when called goes to our next middleware
    this.phone = '093' + this.phone; // dummy thing to do just for learning
    console.log("in Save MiddleWare adding 093 to: %s", this.phone);
    this.name = String(this.name).trim(); // remve whitespaces
    next(); // go to the next middlware if exists
});

userSchema.pre("updateMany", function(next) {
    console.log("inside UpdateMany Middleware");
    next();
});

// post operation
userSchema.post("save", function(doc, next) {
    doc.getAllCurrentInfo(); // getAllCurrentInfo() is now accessible by doc/table to be called
    console.log("Saving Data");
    next(); // go to the next middlware
});

// export the model
module.exports = mongoose.model("devs", userSchema);
// thats a wrap for this script