const express = require('express');
const { getAllUsers, addUser, getUserById, updateUser, deleteUser } = require('../Controllers/UserControllers');

const router = express.Router();

// Define routes
router.get('/', getAllUsers);
router.post('/', addUser); // Ensure addUser is correctly imported
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;