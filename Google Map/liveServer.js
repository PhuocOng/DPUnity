const express = require("express")
const app = express()
const path = require('path')
const port = 3000;

app.set('view engine', 'ejs'); //Here is to activate ejs to create dynamic HTML
app.set('views', path.join(__dirname, '/views')) 
app.get('/', (req, res) => {
    res.render('index.ejs');
})


app.get("*", (req, res) => {
    res.render("index.html");
})  //Response to all the path different those above

app.listen(port, () => {
    console.log("Server is created")
}) //Print "Server is created" when the server is created
