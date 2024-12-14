const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");

router.route("/").get(signupController.welcomeNewUser).post(signupController.handleNewUser);

module.exports = router;