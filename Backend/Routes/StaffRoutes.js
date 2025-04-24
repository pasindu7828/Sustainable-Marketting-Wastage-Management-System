const express = require('express');
const router = express.Router();
const StaffController = require('../Controllers/StaffControllers');
const adminMiddleware = require('../Middleware/adminMiddleware');

// Apply admin middleware to all staff routes
router.use(adminMiddleware);

// Staff routes
router.get('/', StaffController.getAllStaff);
router.post('/add', StaffController.addStaff);
router.get('/:id', StaffController.getStaffById);
router.put('/:id', StaffController.updateStaff);
router.delete('/:id', StaffController.deleteStaff);

module.exports = router; 