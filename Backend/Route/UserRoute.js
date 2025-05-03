const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

// Register
router.post('/register', UserController.registerUser);
// Login
router.post('/login', UserController.loginUser);
// Get all users (admin only)
router.get('/', UserController.getAllUsers);
// Get user by id
router.get('/:id', UserController.getUserById);
// Update user
router.put('/:id', UserController.updateUser);
// Delete user (admin only)
router.delete('/:id', UserController.deleteUser);

module.exports = router; 