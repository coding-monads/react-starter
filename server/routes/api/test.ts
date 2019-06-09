import express from "express";
const router = express.Router();

// @route   GET api/test
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.json({ msg: "test works" }));

export default router;
