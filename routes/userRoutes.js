const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const { name, email, age, occupation } = req.body;
    
    const newUser = new User({
      name,
      email,
      age,
      occupation
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, age, occupation } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age, occupation },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;