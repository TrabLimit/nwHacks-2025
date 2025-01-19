const express = require("express");
const {v4: uuidv4} = require('uuid');
const router = express.Router();
const userModel = require("../mongodb/schemas").userModel;
const workoutModel = require("../mongodb/schemas").workoutModel;

// GET endpoint to fetch all data for a specific user
router.get("/users/:uuid", async (req, res) => {
    try {
        // Getting and responding with user data
        const user = await userModel.find({_id: req.params.uuid});
        if (user == null) {
            res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST endpoint to create a new user
router.post("/users", async (req, res) => {
    try {
        // Creating a new user
        const newUser = new userModel({
            _id: uuidv4(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            muscleGroupFocus: req.body.muscleGroupFocus,
            preferredMusic: req.body.preferredMusic,
        });
        // Saving the user to the database
        await newUser.save();
        res.send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// PUT endpoint to update a user's data
router.put("/users/:uuid", async (req, res) => {
    try {
        // Checking if the user exists
        const user = await userModel.find({_id: req.params.uuid});
        if (user == null) {
            res.status(404).send("User not found");
        }
        // Updating the user's data with the fields provided in the request body
        await userModel.updateOne({_id: req.params.uuid}, req.body);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to fetch all workouts
router.get("/workouts", async (req, res) => {
    try {
        // Getting and responding with all workouts
        const workouts = await workoutModel.find({});
        res.send(workouts);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
