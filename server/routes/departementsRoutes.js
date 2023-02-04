const express = require('express');
const departmentController = require('../controllers/departementController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', departmentController.getDepartements);

module.exports = router;