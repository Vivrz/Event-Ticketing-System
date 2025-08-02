const farmer = require("./Models/farmerschema.js");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const cors = require("cors");
const Organiser = require('./Models/OrgansierSchema.js');
const varify = require("./varifyEmail.js");

const { signupValidation, LoginValidation } = require('./Middleware/AuthValidation.js');
const connectionWithDB = require('./Models/DB.js');
connectionWithDB().catch(err => {
  console.error("Database connection error:", err);
  process.exit(1);
});
const app = express();
require('dotenv').config();
app.use(cors({
  origin: ['https://event-ticket-system-tan.vercel.app', 'http://localhost:5173/'],
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

app.get("/", (req, res) => {
  res.send("   backend");
})

app.post("/Organiser-Login", LoginValidation, async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await Organiser.findOne({ email });
    const errormsg = "Auth failed or password is wrong !";
    if (!user) {
      return res.status(403)
        .json({ message: errormsg, success: false })
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.status(403)
        .json({ message: errormsg, success: false })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT Secret is not defined", success: false });
    }

    const jwtoken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200).
      json({ message: "Login successfully", success: true, jwtoken, email, name: user.name })
  }
  catch (error) {
    console.log(error);
    res.status(500).
      json({ message: "Internal server error ", success: false })
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

app.post("/Organiser-Signup", signupValidation, async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await Organiser.findOne({ email });
    if (user) {
      return res.status(409)
        .json({ message: "User is already exist , you can login", success: false })
    }
    const valid = await varify(email);
    if(!valid){
      return res.status(400).json({message : "Invalid Email" , success : false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new Organiser({ name, email, password: hashedPassword });
    await userModel.save();
    res.status(201).
      json({ message: "Signup successfully", success: true })
  }
  catch (error) {
    console.log(error);
    res.status(500).
      json({ message: "Internal server error ", success: false })
  }
})

app.post("/Signup", signupValidation, async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const role = 'user';
    const user = await farmer.findOne({ email });
    if (user) {
      return res.status(409)
        .json({ message: "User is already exist , you can login", success: false })
    }
    const valid = await varify(email);
    if(!valid){
      return res.status(400).json({message : "Invalid or undeliverable email address " , success : false});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new farmer({ name, email, password: hashedPassword, role });
    await userModel.save();
    res.status(201).
      json({ message: "Signup successfully", success: true })
  }
  catch (error) {
    console.log(error);
    res.status(500).
      json({ message: "Internal server error ", success: false })
  }
})

app.post("/googleLogin" , async (req , res) =>{
  try{
    const {name , email} = req.body;
    let existingUser = await farmer.findOne({email});
    if(!existingUser){
      const newUser = new farmer({name , email , role : "user"});
      await newUser.save();
       return res.status(200).json({ success: true, user: newUser });
    }
    return res.status(200).json({success : false , message : "exist" , user : existingUser});
  }
  catch(err){
    res.status(500).json({success : false , message : "something went wrong !!"});
  }
})

app.post("/Login", LoginValidation, async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await farmer.findOne({ email });
    const errormsg = "Auth failed or password is wrong !";
    if (!user) {
      return res.status(403)
        .json({ message: errormsg, success: false })
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.status(403)
        .json({ message: errormsg, success: false })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT Secret is not defined", success: false });
    }

    const jwtoken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200).json({
      message: "Login successfully",
      success: true,
      jwtoken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  }
  catch (error) {
    console.log(error);
    res.status(500).
      json({ message: "Internal server error ", success: false })
  }
})


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
