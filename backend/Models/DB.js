const mongoose = require('mongoose');

function connectionWithDB() {
    mongoose.connect("mongodb://localhost:27017/eventsDB").then(() => {
        console.log("connect to db");
    }).catch((err) => {
        console.log(err);
    })
}
module.exports = connectionWithDB;


