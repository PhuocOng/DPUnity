//seed.js file is used to initiate first data for the databses

const mongoose = require('mongoose');
const Report = require('./models/report.js'); //Import the Product schema

main()   //connect to mongoose databases init
    .then(() => {
        console.log("connection successfully to mongoose")
    })
    .catch(err => {
        console.log(err)
        console.log('Oh no, mongoose Error!');
    });


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/anonymousReport');
    // main() to connect index.js to mongoose databases
}


const seedReports = [
    {
        time: "7:30",
        date: "2023-04-21",
        location: "Delta Upsilon, DePauw",
        description: "Here is description for first report"
    },
    {
        time: "9:15",
        date: "2022-12-31",
        location: "Kappa Theta Gamma, DePauw",
        description:"Here is description for second report"
    }  
]


Report.deleteMany({})
Report.insertMany(seedReports)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })