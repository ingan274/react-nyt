const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./Articles.js");
const googleRoutes = require("./Google.js");

// API Routes
router.use("/api/articles", apiRoutes);
router.use("/api/google", googleRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

module.exports = router;