const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const collegeController = require('../controllers/collegeController');

const router = express.Router();

router.get('/', collegeController.getCollege);

module.exports = router;