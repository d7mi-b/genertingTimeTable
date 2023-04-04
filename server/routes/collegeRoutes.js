const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const collegeController = require('../controllers/collegeController');

const router = express.Router();

router.use(requireAuth);

router.get('/', collegeController.getCollege);

module.exports = router;