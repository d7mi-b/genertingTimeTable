const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const systemStateController = require('../controllers/systemStateController');

const router = express.Router();

router.use(requireAuth);

router.get('/', systemStateController.getSystemState);
router.put('/update', systemStateController.updateSystemstate);
router.put('/changeDefaultWieghts', systemStateController.changeDefaultWeights);
router.get('/weights', systemStateController.weights);
router.put('/weights/update', systemStateController.updateWeights);
router.get('/yerasOfSystem', systemStateController.getYearsOfSystemState);
router.put('/updateNumbersOfConstraints', systemStateController.updateNumbersOfConstraints);

module.exports = router;