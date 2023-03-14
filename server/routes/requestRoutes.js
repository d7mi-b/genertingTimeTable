const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.use(requireAuth);

router.post('/',requestController.postRequest)
router.get('/exportRequests/:Deparetment_ID',requestController.exportRequests)
router.get('/importRequests/:Deparetment_ID',requestController.importRequests)

module.exports = router;