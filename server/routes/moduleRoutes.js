const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const moduleController = require('../controllers/moduleController');

const router = express.Router();

router.use(requireAuth);

router.put('/updateLecturer',moduleController.updateLecturer);
router.put('/updateHall',moduleController.updateHall);
router.get('/:Department_ID',moduleController.getDepartmentModule);

module.exports = router;
