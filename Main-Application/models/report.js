//This file is used to set up schema

const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }

})

const Report = mongoose.model('Report', reportSchema);
module.exports=Report;   //So we can use this Schema at any files we want