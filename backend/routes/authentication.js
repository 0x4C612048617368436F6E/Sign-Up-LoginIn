const authenticationController = require("../controllers/authenticationController");
const express = require("express");
const router = express.Router();

router.route('/').get(authenticationController.welcomeUserToAuthentication).post(authenticationController.authenticateUser);

module.exports = router;