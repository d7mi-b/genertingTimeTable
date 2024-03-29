const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const moduleController = require('../controllers/moduleController');

const router = express.Router();

// router.use(requireAuth);

router.put('/updateLecturer',moduleController.updateLecturer);
router.put('/updateHall',moduleController.updateHall);
router.put('/updatePracticalNo',moduleController.updatePracticalNo);
router.get('/updateGroup',moduleController.updateGroup);
router.get('/:Department_ID/:Semester',moduleController.getDepartmentModule);

module.exports = router;
