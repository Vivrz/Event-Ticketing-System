const axios = require('axios');
require('dotenv').config();

const varifyEmailaddress = async (email) => {
    const hunter_api_key = process.env.HUNTER_API_KEY;
    const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${hunter_api_key}`;

    try{
        const res = await axios.get(url);
        const resdata = res.data.data;
        console.log("Hunter API result" , resdata);
        if(resdata.result === "deliverable"){
            return true;
        }
        else{
            console.log("There is an error");
            return false;
        }
    }
    catch(error){
        console.log("varifying the email" , error);
        return false;
    }
}

module.exports = varifyEmailaddress;