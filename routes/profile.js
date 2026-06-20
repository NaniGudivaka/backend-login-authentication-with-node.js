const express = require("express");
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const [user] = await db.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;