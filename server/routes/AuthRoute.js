const { checkProfile, createProfile } = require("../controllers/profilesController.js");
const {userVerification}= require("../middleware/AuthMiddleware.js");
const express = require("express");
const router = express.Router();

router.post("/signup", createProfile);
router.post("/login", checkProfile);
router.post("/", userVerification);

module.exports = router;
