const User = require("../Model/UserModel.js");  

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

// Add a new user
const addUser = async (req, res, next) => {
    const { fullName, email, password, phone, address } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create a new user object
        const user = new User({ fullName, email, password, phone, address });
        await user.save();  // Save the user to the database

        // Return the newly created user with a 200 status
        return res.status(201).json({ user });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while adding user" });
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
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the user
        if (!updatedUser) return res.status(404).json({ message: 'User not found' }); // If not found, return 404
        res.status(200).json(updatedUser); // Return the updated user
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle update errors
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

// Export all functions
module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser
};