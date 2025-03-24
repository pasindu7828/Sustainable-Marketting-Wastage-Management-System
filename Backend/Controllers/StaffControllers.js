const Staff = require("../Model/StaffModel.js");  // Assuming the model is now called StaffModel.js

// Get all staff members
const getAllStaff = async (req, res, next) => {
    let staff;

    try {
        staff = await Staff.find(); // Fetch all staff from the database
    } catch (err) {
        console.log(err);
    }

    // If no staff found, return a 404 response
    if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
    }

    // Return the list of staff with a 200 status
    return res.status(200).json({ staff });
};

// Add a new staff member
const addStaff = async (req, res, next) => {
    const { fullName, email, password, phone, address, role, status } = req.body;

    try {
        // Check if the email already exists
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create a new staff object
        const staff = new Staff({ fullName, email, password, phone, address, role, status });
        await staff.save();  // Save the staff to the database

        // Return the newly created staff with a 201 status
        return res.status(201).json({ staff });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while adding staff" });
    }
};

// Get a staff member by ID
const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id); // Find the staff by ID
        if (!staff) return res.status(404).json({ message: 'Staff not found' }); // If not found, return 404
        res.status(200).json({ staff }); // Return the found staff
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Update an existing staff member by ID
const updateStaff = async (req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the staff
        if (!updatedStaff) return res.status(404).json({ message: 'Staff not found' }); // If not found, return 404
        res.status(200).json(updatedStaff); // Return the updated staff
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle update errors
    }
};

// Delete a staff member by ID
const deleteStaff = async (req, res, next) => {
    const id = req.params.id;
    let staff;

    try {
        staff = await Staff.findByIdAndDelete(id); // Find and delete the staff by ID
    } catch (err) {
        console.log(err);
    }

    // If the staff does not exist, return a 404 response
    if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
    }

    // Return the deleted staff with a 200 status
    return res.status(200).json({ staff });
};

// Export all functions
module.exports = {
    getAllStaff,
    addStaff,
    getStaffById,
    updateStaff,
    deleteStaff
};
