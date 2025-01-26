const mongoose = require('mongoose');
require('dotenv').config()
function connectionWithDB() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        
        console.log("connect to db");
    }).catch((err) => {
        console.log(err);
    })
}
module.exports = connectionWithDB;


