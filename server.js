const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const cors = require("cors");
const Organiser = require('./Models/OrgansierSchema.js');

const {signupValidation , LoginValidation} = require('./Middleware/AuthValidation.js');
const connectionWithDB = require('./Models/DB.js');
connectionWithDB().catch(err => {
  console.error("Database connection error:", err);
  process.exit(1);
});
const app = express();
require('dotenv').config();
app.use(cors({
    origin: ['https://event-ticket-system-tan.vercel.app','http://localhost:5173/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));

app.use(express.json());

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  price: String,
  description: String,
});

const Event = mongoose.model("Event", eventSchema);

const ticketSchema = new mongoose.Schema({
  eventId: String,
  userName: String,
  userEmail: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

app.post("/add-event", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/book-ticket", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

const jwt = require('jsonwebtoken');
const farmer = require("./Models/farmerschema.js");

app.get("/", (req, res) => { 
    res.send("hello from backend");
})

app.post("/Organiser-Login" ,LoginValidation, async(req , res) => {
  try{
      const { password , email  } = req.body;
      const user = await Organiser.findOne({email});
      const errormsg  = "Auth failed or password is wrong !";
      if(!user){
          return res.status(403)
          .json({message : errormsg , success : false})
      }
      const ispassword = await bcrypt.compare(password , user.password);
      if(!ispassword){
          return res.status(403)
          .json({message : errormsg , success : false})
      }

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT Secret is not defined", success: false });
      }

      const jwtoken = jwt.sign(
          {email : user.email  , _id : user._id},
          process.env.JWT_SECRET,
          { expiresIn : '24h'}
      )
      
       res.status(200).
      json({message : "Login successfully", success : true , jwtoken  , email , name : user.name})
  }
  catch(error){
      console.log(error);
      res.status(500).
      json({message : "Internal server error " ,  success : false})
  }
})

app.delete("/delete-event/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId); 
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting event" });
  }
});

app.post("/Organiser-Signup" ,signupValidation, async(req , res) => {
  try{
      const {name ,   password , email    } = req.body;
      const user = await Organiser.findOne({email});
      if(user){
          return res.status(409)
          .json({message : "User is already exist , you can login" , success : false})
      } 
      const hashedPassword = await bcrypt.hash(password, 10);
      const userModel = new Organiser({ name, email, password: hashedPassword });
      await userModel.save();
      res.status(201).
      json({message : "Signup successfully", success : true})
  }
  catch(error){
      console.log(error);
      res.status(500).
      json({message : "Internal server error " ,  success : false })
  }
})

app.post("/Signup" ,signupValidation, async(req , res) => {
    try{
        const {name ,   password , email    } = req.body;
        const user = await farmer.findOne({email});
        if(user){
            return res.status(409)
            .json({message : "User is already exist , you can login" , success : false})
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new farmer({ name, email, password: hashedPassword });
        await userModel.save();
        res.status(201).
        json({message : "Signup successfully", success : true})
    }
    catch(error){
        console.log(error);
        res.status(500).
        json({message : "Internal server error " ,  success : false })
    }
})

app.post("/Login" ,LoginValidation, async(req , res) => {
    try{
        const { password , email  } = req.body;
        const user = await farmer.findOne({email});
        const errormsg  = "Auth failed or password is wrong !";
        if(!user){
            return res.status(403)
            .json({message : errormsg , success : false})
        }
        const ispassword = await bcrypt.compare(password , user.password);
        if(!ispassword){
            return res.status(403)
            .json({message : errormsg , success : false})
        }

        if (!process.env.JWT_SECRET) {
          return res.status(500).json({ message: "JWT Secret is not defined", success: false });
        }

        const jwtoken = jwt.sign(
            {email : user.email  , _id : user._id},
            process.env.JWT_SECRET,
            { expiresIn : '24h'}
        )
        
         res.status(200).
        json({message : "Login successfully", success : true , jwtoken  , email , name : user.name})
    }
    catch(error){
        console.log(error);
        res.status(500).
        json({message : "Internal server error " ,  success : false})
    }
})


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
