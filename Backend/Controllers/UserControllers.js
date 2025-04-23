const User = require("../Model/UserModel.js");  
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Get all users
const getAllUsers = async (req, res, next) => {  
    let users;

    try {
        users = await User.find(); // Fetch all users from the database
    } catch (err) {
        console.log(err);
    }

    // If no users found, return a 404 response
    if (!users) {
        return res.status(404).json({ message: "Users not found" });
    }

    // Return the list of users with a 200 status
    return res.status(200).json({ users });
};

// Add a new user (Registration)
const addUser = async (req, res, next) => {
    const { fullName, email, password, phone, address, role } = req.body;

    try {
        console.log('Registration attempt:', { fullName, email, phone, role });

        // Validate required fields
        if (!fullName || !email || !password || !phone || !address) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                message: "All fields are required",
                missingFields: {
                    fullName: !fullName,
                    email: !email,
                    password: !password,
                    phone: !phone,
                    address: !address
                }
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email format:', email);
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Password strength validation
        if (password.length < 6) {
            console.log('Password too short');
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Phone number validation (assuming 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            console.log('Invalid phone format:', phone);
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email already registered:', email);
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set role based on email or provided role
        let userRole = 'user';
        if (email === 'admin@example.com') {
            userRole = 'admin';
        } else if (role && ['staff', 'manager', 'supervisor'].includes(role)) {
            userRole = role;
        }

        console.log('Creating user with role:', userRole);

        // Create new user
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            phone,
            address,
            role: userRole
        });

        const savedUser = await user.save();
        console.log('User saved successfully:', savedUser._id);

        // Create JWT token
        const token = jwt.sign(
            { userId: savedUser._id, email: savedUser.email, role: savedUser.role },
            'your-secret-key', // In production, use environment variable
            { expiresIn: '24h' }
        );

        // Return success response with token and user data
        return res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                phone: savedUser.phone,
                role: savedUser.role
            }
        });

    } catch (err) {
        console.error('Registration error:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: Object.values(err.errors).map(error => error.message)
            });
        }
        return res.status(500).json({ 
            message: "Error during registration",
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find the user by ID
        if (!user) return res.status(404).json({ message: 'User not found' }); // If not found, return 404
        res.status(200).json({ user }); // Return the found user
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Update an existing user by ID
const updateUser = async (req, res) => {
    try {
        const { fullName, email, phone, address, role } = req.body;
        const userId = req.params.id;

        // Find the user first
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate email if it's being changed
        if (email && email !== user.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            // Check if new email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already registered" });
            }
        }

        // Validate phone if it's being changed
        if (phone && phone !== user.phone) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ message: "Invalid phone number format" });
            }
        }

        // Validate role if it's being changed
        if (role && role !== user.role) {
            if (!['user', 'admin', 'staff', 'manager', 'supervisor'].includes(role)) {
                return res.status(400).json({ message: "Invalid role" });
            }
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, email, phone, address, role },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (err) {
        console.error('Update error:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: Object.values(err.errors).map(error => error.message)
            });
        }
        return res.status(500).json({ 
            message: "Error updating user",
            error: err.message
        });
    }
};

// Delete a user by ID
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;

    try {
        user = await User.findByIdAndDelete(id); // Find and delete the user by ID
    } catch (err) {
        console.log(err);
    }

    // If the user does not exist, return a 404 response
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Return the deleted user with a 200 status
    return res.status(200).json({ user });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            'your-secret-key', // In production, use environment variable
            { expiresIn: '24h' }
        );

        // Return user data and token
        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error during login" });
    }
};

// Get all staff members
const getAllStaff = async (req, res) => {
    try {
        const staff = await User.find({ role: { $in: ['staff', 'manager', 'supervisor'] } });
        res.status(200).json({ staff });
    } catch (err) {
        res.status(500).json({ message: "Error fetching staff members" });
    }
};

// Update a staff member
const updateStaff = async (req, res) => {
    try {
        const { fullName, email, phone, address, role } = req.body;
        const staffId = req.params.id;

        // Find the staff member first
        const staff = await User.findById(staffId);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        // Verify this is actually a staff member
        if (!['staff', 'manager', 'supervisor'].includes(staff.role)) {
            return res.status(400).json({ message: 'User is not a staff member' });
        }

        // Validate email if it's being changed
        if (email && email !== staff.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            // Check if new email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already registered" });
            }
        }

        // Validate phone if it's being changed
        if (phone && phone !== staff.phone) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ message: "Invalid phone number format" });
            }
        }

        // Validate role if it's being changed
        if (role && role !== staff.role) {
            if (!['staff', 'manager', 'supervisor'].includes(role)) {
                return res.status(400).json({ message: "Invalid staff role" });
            }
        }

        // Update the staff member
        const updatedStaff = await User.findByIdAndUpdate(
            staffId,
            { fullName, email, phone, address, role },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Staff member updated successfully",
            staff: updatedStaff
        });

    } catch (err) {
        console.error('Staff update error:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: Object.values(err.errors).map(error => error.message)
            });
        }
        return res.status(500).json({ 
            message: "Error updating staff member",
            error: err.message
        });
    }
};

// Export all functions
module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    getAllStaff,
    updateStaff
};