// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const profilesController = require("./controllers/profilesController");
var cron = require("node-cron");

cron.schedule("*/2 * * * *", () => {
  console.log("running a task every two minutes");
});

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing
app.get("/profiles", profilesController.fetchProfiles);
app.get("/profiles/:id", profilesController.fetchProfile);
app.post("/profiles", profilesController.createProfile);
app.put("/profiles/:id", profilesController.updateProfile);
app.delete("/profiles/:id", profilesController.deleteProfile);

// Start our server
app.listen(process.env.PORT);
