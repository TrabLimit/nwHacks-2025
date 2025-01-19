const mongoose = require("mongoose");

// =============== USER ===============
// Schema for an individual user on the website
const userSchema = new mongoose.Schema({
    _id: mongoose.Types.UUID,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    muscleGroupFocus: [{ type: String }],
    targetWorkouts: { type: Number, default: 0 },
    workoutsCompleted: { type: Number, default: 0 },
    preferredMusic: [{ type: String }],
});

// =============== WORKOUT ===============
// Schema for a workout pose at a specific time
const poseSchema = new mongoose.Schema({
    _id: mongoose.Types.UUID,
    poseName: { type: String, required: true },
    poseTime: { type: Number, required: true },     // Time in seconds since start of music
});

// Schema for a workout that a user will complete
const workoutSchema = new mongoose.Schema({
    _id: mongoose.Types.UUID,
    name: { type: String, required: true },
    description: { type: String, required: true },
    muscleGroups: [{ type: String }],
    exercises: [{ type: poseSchema }],
    difficulty: { type: String, required: true },
    equipment: [{ type: String }],
    songURL: { type: String },
});

const userModel = mongoose.model("User", userSchema);
const workoutModel = mongoose.model("Workout", workoutSchema);

module.exports = { userModel, workoutModel };
