const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,  // e.g., 'admin', 'manager', 'employee'
    },
    status: {
        type: String,
        required: true,  // e.g., 'active', 'inactive'
    }
});

module.exports = mongoose.model("Staff", staffSchema);
