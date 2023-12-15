const mongoose = require('mongoose')

// Create Schema
const ApplicationSchema = new mongoose.Schema({
    seeker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
    },
    status: {
        type: String,
        enum: ["accepted", "pending", "rejected"],
        default: "pending",
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model('application', ApplicationSchema);

module.exports = Application;

