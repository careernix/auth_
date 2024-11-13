const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.listen(8080, () => console.log("Server running on port 8080"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log('Connection error:', error));

// Register Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,  // Store the hashed password
    });
    res.json({ status: "success" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.json({ status: "error", error: 'duplicate email' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    // Check if user exists and password is correct
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name
        },
        '123456'
      );

      return res.json({
        status: "success",
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt
        }
      });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.json({ status: "error", message: "An error occurred during login" });
  }
});

