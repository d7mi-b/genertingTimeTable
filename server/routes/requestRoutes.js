const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.use(requireAuth);

router.post('/',requestController.postRequest)
router.get('/:Deparetment_ID',requestController.getRequests)
router.put('/',requestController.updateRequest)

module.exports = router;