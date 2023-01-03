const bodyParser = require("body-parser");
const express = require("express")
const app = express();
const mongoose = require('mongoose')




var password = 'vBfl0rYfPZTY4l24';
var database = "FutureDiseaseDescriptor";

var url = `mongodb+srv://FutureDiseaseDescriptor:${password}@futurediseasedescriptor.tcv63sb.mongodb.net/${database}`

mongoose.connect(url);

mongoose.connection.on('error',err=>{
    console.log("Connection Failed")
})

mongoose.connection.on('connected',connected=>{
    console.log("Connected Successfully")
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({limit: "50mb"}));

app.set('view engine', 'ejs');
app.use('/', require('./routes/index'))









  app.use((req,res,next)=>{
    res.status(400).json({
        "message": "Not Found"
    })
})


module.exports = app

//https://fyp-project-api.herokuapp.com/