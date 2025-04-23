const express = require('express');
const router = express.Router();
const { getAllStaff, updateStaff } = require('../Controllers/UserControllers');
const authMiddleware = require('../Middleware/authMiddleware');

// Staff routes with authentication
router.get('/', authMiddleware, getAllStaff);
router.put('/:id', authMiddleware, updateStaff);

module.exports = router;
