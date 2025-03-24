const express = require('express');
const { getAllStaff, addStaff, getStaffById, updateStaff, deleteStaff } = require('../Controllers/StaffControllers');

const router = express.Router(); // Initialize the router

// Define the routes
router.get('/', getAllStaff);        // Get all staff
router.post('/', addStaff);          // Add a new staff
router.get('/:id', getStaffById);    // Get a staff by ID
router.put('/:id', updateStaff);     // Update a staff by ID
router.delete('/:id', deleteStaff);  // Delete a staff by ID

module.exports = router; // Correctly export the router object
