const User = require('../Model/UserModel');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (email === 'admin@gmail.com') {
      return res.status(400).json({ message: 'Cannot register as admin.' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone, address });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user or admin
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (email === 'admin@gmail.com') {
      if (password === 'admin123') {
        return res.status(200).json({ isAdmin: true, email, name: 'Admin' });
      } else {
        return res.status(401).json({ message: 'Invalid admin credentials.' });
      }
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    res.status(200).json({ isAdmin: false, email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const { adminEmail } = req.query;
    if (adminEmail !== 'admin@gmail.com') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user (self or admin)
const updateUser = async (req, res) => {
  try {
    const { name, password, phone, address } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const { adminEmail } = req.query;
    if (adminEmail !== 'admin@gmail.com') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}; 