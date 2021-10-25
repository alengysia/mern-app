const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require('cors')


const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL 

mongoose.connect(DATABASE_URL)

const db = mongoose.connection

db.on("error", (err) => console.log("He's gonna eat the goat?"))
db.on("connected", () => console.log("They DO move in herds"))
db.on("disconnected", () => console.log("I've decided not to endorse your park"))

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(logger('dev'))
app.use(express.json());
app.use(cors())
 


const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
  });



app.get("/", (req, res) => {
    res.send("hello world");
  });



// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

// PEOPLE DELETE ROUTE
app.delete("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(await People.findByIdAndDelete(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE UPDATE ROUTE
  app.put("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });


  
  // PEOPLE CREATE ROUTE
  app.post("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });







  app.listen(PORT, () => console.log("Life uh uh uh finds a way"));