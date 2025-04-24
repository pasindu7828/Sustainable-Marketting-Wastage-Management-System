const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserControllers');

// User routes
router.get('/', UserController.getAllUsers);
router.post('/register', UserController.addUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/login', UserController.loginUser);

// Staff routes
router.get('/staff', UserController.getAllStaff);
router.put('/staff/:id', UserController.updateStaff);

module.exports = router; 