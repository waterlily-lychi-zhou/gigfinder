const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')


const app = express()
const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gigfinder')
  .then(() => console.log('successfully connected to database'))
  .catch((error) => console.error('error connecting to database:  ', error));

//use routes   
app.use('/api', routes);  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})