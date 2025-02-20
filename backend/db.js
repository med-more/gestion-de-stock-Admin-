const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./route");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/stock', route); 
mongoose.connect("mongodb://127.0.0.1:27017/ecomm")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Failed to connect to MongoDB:', err.message));
  
  const PORT = 8000;
  app.listen(PORT, () => {
      console.log(`👽 Server is running on port ${PORT}`); 
  });

