const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

// First protected route
router.get("/profile", authenticateToken, (req, res) => {
  return res.status(200).json({
    message: "Welcome to your profile!",
    user: {
      id: req.user.id,
      email: req.user.email,
      created_at: req.user.created_at
    }
  });
});

// Second protected route
router.get("/dashboard", authenticateToken, (req, res) => {
  return res.status(200).json({
    message: "Welcome to your dashboard!",
    user: {
      id: req.user.id,
      email: req.user.email
    }
  });
});

module.exports = router;