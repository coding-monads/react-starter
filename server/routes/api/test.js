const express = require('express');
const router = express.Router();

// @route   GET api/test
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.json({ msg: 'test works' }));

module.exports = router;
