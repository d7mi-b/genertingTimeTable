const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const systemStateController = require('../controllers/systemStateController');

const router = express.Router();

router.use(requireAuth);

router.get('/', systemStateController.getSystemState);
router.put('/update', systemStateController.updateSystemstate);

module.exports = router;