const { required } = require('joi');
const mongoose = require('mongoose');

const farmerschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type : String,
        enum : ['user' , 'organiser'],
        default : 'user'
    }
})

const Farmer = mongoose.model('Farmers', farmerschema);
module.exports = Farmer;