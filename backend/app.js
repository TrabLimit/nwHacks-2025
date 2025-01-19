const express = require("express");
const apiRoutes = require("./routes/api");
const mongoose = require("mongoose");
const workoutModel = require("./mongodb/schemas").workoutModel;
const initialState = require("./mongodb/initial_state").initialState;
require('dotenv').config();

// Initializing an instance of "express" and setting up all dependencies
let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Object to store allowed sites for CORS
const cors = {
    origins: ["http://localhost:8080", "http://localhost:3000", "http://localhost:5173"],
    default: "http://localhost:8080"
}

// CORS middleware adapted from https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use(function (req, res, next) {
    // Checking if the origin of the request comes from a site allowed to visit the backend
    const origin = cors.origins.includes(req.header("origin").toLowerCase()) ? req.headers.origin : cors.default;

    // Allowing access to websites we wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', origin);

    // Request methods we wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers we wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Allowing cookies for these websites
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Using API routes
app.use("/api", apiRoutes);

// Connecting to the nwHacks-2025 database in the MongoDB cluster
mongoose.connect(process.env.ATLAS_URI, { dbName: "nwHacks-2025" }).then(async () => {
    console.log("Successfully connected to Atlas MongoDB server!");
    // Inserting initial data if the database is empty
    const data = await workoutModel.find({});
    if (data.length == 0) {
        await workoutModel.insertMany(JSON.parse(initialState));
    }
}).catch(
    error => {console.log("Error connecting to MongoDB Atlas server: " + error)}
);

module.exports = app;
