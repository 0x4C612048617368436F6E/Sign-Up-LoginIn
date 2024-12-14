const express = require("express");
const router = express.Router();
const rootHandler = require("../controllers/rootController")

router.route('/').get(rootHandler)

module.exports = router