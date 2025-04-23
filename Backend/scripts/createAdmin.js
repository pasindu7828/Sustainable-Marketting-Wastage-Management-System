const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../Model/UserModel');

async function createAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://admin:KkSgstyLqciJwnAP@cluster0.ympdn.mongodb.net/");
        console.log('Connected to MongoDB');

        // Delete existing admin user if exists
        await User.deleteOne({ email: 'admin@gmail.com' });
        console.log('Deleted existing admin user if any');

        // Create admin user with hashed password
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = new User({
            fullName: 'Admin User',
            email: 'admin@gmail.com',
            password: hashedPassword,
            phone: '1234567890',
            address: 'Admin Address',
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');

        // Verify the created user
        const verifyUser = await User.findOne({ email: 'admin@gmail.com' });
        if (verifyUser) {
            console.log('Verified admin user:', {
                email: verifyUser.email,
                role: verifyUser.role,
                id: verifyUser._id,
                hashedPassword: verifyUser.password.substring(0, 10) + '...'
            });
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

createAdminUser(); 