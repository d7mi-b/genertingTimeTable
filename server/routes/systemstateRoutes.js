const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const systemStateController = require('../controllers/systemStateController');

const router = express.Router();

router.use(requireAuth);

router.get('/', systemStateController.getSystemState);
router.put('/update', systemStateController.updateSystemstate);
router.get('/weights', systemStateController.weights);
router.put('/weights/update', systemStateController.updateWeights);

module.exports = router;