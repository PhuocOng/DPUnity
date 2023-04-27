const express = require('express')
const Report = require('./models/report')
const app = express()
const methodOverride = require('method-override')
const path = require('path')  //prep to set up that the render() will render files in views folder
// getting-started.js

const uri = "mongodb+srv://dbUser1:8zWlE1WnhWhOlZVO@cluster0.0qecgfb.mongodb.net/?retryWrites=true&w=majority";
//Old way to connect the local database by Mongoose
const mongoose = require('mongoose');

main()   //connect to mongoose databases init
    .then(() => {
        console.log("connection successfully to mongoose")
    })
    .catch(err => {
        console.log(err)
        console.log('Oh no, mongoose Error!');
    });


async function main() {
    await mongoose.connect('mongodb+srv://dbUser1:8zWlE1WnhWhOlZVO@cluster0.0qecgfb.mongodb.net/?retryWrites=true&w=majority');
    // main() to connect index.js to mongoose databases
}

// New way to connect remote database by mongodb atlas

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://dbUser1:8zWlE1WnhWhOlZVO@cluster0.0qecgfb.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))//this sentence make it possible to access req.body
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'image')));


app.get('/', (req,res) => {
    res.render('homepage.ejs');
})

app.get('/service', (req, res) => {
    res.render('service.ejs');
})
app.get('/reports', async (req, res) => {
    const reports = await Report.find({}).sort({ _id: -1 }); //Reverse the display show of Mongoose
    res.render('index.ejs', { reports });
})

app.get('/reports/data', async (req, res) => {  //push data of Report in Mongoose to API /reports/data 
    try {
        const data = await Report.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/map', async (req, res) => {
    const reports = await Report.find({}).sort({ _id: -1 }); //Reverse the display show of Mongoose
    res.render('map.ejs', { reports })
})

app.get('/reports/new', async (req, res) => {
    res.render('new.ejs')

})

app.get('/reports/:id', async (req, res) => {
    const { id } = req.params;
    const report = await Report.findById(id);
    res.render('report.ejs', { report })
})



app.post('/reports', async (req, res) => {
    const newReport = new Report(req.body);
    console.log(newReport)
    await newReport.save();
    res.redirect(`/reports/${newReport._id}`)
})

app.delete('/reports/:id', async (req, res) => { // To delete the product
    const { id } = req.params;
    const deletedProduct = await Report.findByIdAndDelete(id)
    res.redirect('/reports');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`APP IS LISTENING ON PORT ${port}`)
})