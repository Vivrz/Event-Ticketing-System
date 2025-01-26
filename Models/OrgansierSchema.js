const { required } = require('joi');
const mongoose  = require('mongoose');

const organisersSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    }
})

const Organiser = mongoose.model('Organisers', organisersSchema);
module.exports = Organiser;