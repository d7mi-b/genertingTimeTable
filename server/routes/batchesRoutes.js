const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const batchesController = require('../controllers/batchesController');

const router = express.Router();

router.use(requireAuth);

router.get('/department/:Department_ID', batchesController.getBatchesOfDepartment);

module.exports = router;