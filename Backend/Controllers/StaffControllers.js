const Staff = require("../Model/StaffModel.js");  // Assuming the model is now called StaffModel.js
const bcrypt = require('bcryptjs');

// Get all staff members (admin only)
const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).json({ staff });
    } catch (err) {
        res.status(500).json({ message: "Error fetching staff members" });
    }
};

// Add new staff member (admin only)
const addStaff = async (req, res) => {
    const { fullName, email, password, phone, address, position, department, salary } = req.body;

    try {
        // Validate required fields
        if (!fullName || !email || !password || !phone || !address || !position || !department || !salary) {
            return res.status(400).json({ 
                message: "All fields are required",
                missingFields: {
                    fullName: !fullName,
                    email: !email,
                    password: !password,
                    phone: !phone,
                    address: !address,
                    position: !position,
                    department: !department,
                    salary: !salary
                }
            });
        }

        // Check if email already exists
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new staff member
        const staff = new Staff({
            fullName,
            email,
            password: hashedPassword,
            phone,
            address,
            position,
            department,
            salary,
            status: 'active'
        });

        await staff.save();

        res.status(201).json({
            success: true,
            message: "Staff member added successfully",
            staff: {
                id: staff._id,
                fullName: staff.fullName,
                email: staff.email,
                position: staff.position,
                department: staff.department,
                status: staff.status
            }
        });
    } catch (err) {
        console.error('Error adding staff member:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: Object.values(err.errors).map(error => error.message)
            });
        }
        res.status(500).json({ 
            message: "Error adding staff member",
            error: err.message
        });
    }
};

// Get staff member by ID (admin only)
const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) {
            return res.status(404).json({ message: "Staff member not found" });
        }
        res.status(200).json({ staff });
    } catch (err) {
        res.status(500).json({ message: "Error fetching staff member" });
    }
};

// Update staff member (admin only)
const updateStaff = async (req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedStaff) {
            return res.status(404).json({ message: "Staff member not found" });
        }

        res.status(200).json({
            success: true,
            message: "Staff member updated successfully",
            staff: updatedStaff
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating staff member" });
    }
};

// Delete staff member (admin only)
const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        
        if (!staff) {
            return res.status(404).json({ message: "Staff member not found" });
        }

        res.status(200).json({
            success: true,
            message: "Staff member deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ message: "Error deleting staff member" });
    }
};

// Export all functions
module.exports = {
    getAllStaff,
    addStaff,
    getStaffById,
    updateStaff,
    deleteStaff
};
