const express = require('express');
const { getAllUsers, addUser, getUserById, updateUser, deleteUser, loginUser, getAllStaff } = require('../Controllers/UserControllers');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/register', addUser);
router.post('/users/register', addUser); // Adding an alternative route for registration

// Protected routes (require authentication)
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);



module.exports = router;