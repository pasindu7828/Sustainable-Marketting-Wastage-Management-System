const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserControllers');

// User routes
router.get('/users', UserController.getAllUsers);
router.post('/users/register', UserController.addUser);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.post('/users/login', UserController.loginUser);

// Staff routes
router.get('/staff', UserController.getAllStaff);
router.put('/staff/:id', UserController.updateStaff);

module.exports = router; 