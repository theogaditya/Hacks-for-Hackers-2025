const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); 

app.use(express.json());
app.use(cors());

//DB
const mongoURI = process.env.MONGO_URI; 
mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB'))

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  time: String,
  map_link: String,
});

const Event = mongoose.model('Event', eventSchema);

//express
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/events', async (req, res) => {
  const { title, location, time, map_link } = req.body;
  const event = new Event({ title, location, time, map_link });
  await event.save();
  res.status(201).json(event);
});


app.listen(5000, () => console.log('Server running on port 5000'));
