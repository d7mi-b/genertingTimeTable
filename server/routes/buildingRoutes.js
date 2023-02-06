const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const buildingController = require('../controllers/buildingController');

const router = express.Router();

router.use(requireAuth);

router.get('/', buildingController.getAllBuilding);
router.post('/addBuilding', buildingController.addBuilding);

module.exports = router;