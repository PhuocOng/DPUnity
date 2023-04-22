const mongoose = require('mongoose');
const Report = require('../models/report.js'); //Import the Report schema

main()   //connect to mongoose databases init
    .then(() => {
        console.log("connection successfully to mongoose");
        console.log("Retrieving data from database...");
        return Report.find({}).lean().exec(); // Use `lean` to convert Mongoose documents to plain JavaScript objects and `exec` to execute the query
    })
    .then((data) => {
        console.log(data); // Log the retrieved data to the console
        module.exports = data; // Export the data as a module
    })
    .catch(err => {
        console.log(err);
        console.log('Oh no, mongoose Error!');
    });


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/anonymousReport');
    // main() to connect index.js to mongoose databases
}
