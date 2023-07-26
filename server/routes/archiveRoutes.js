const express = require('express');
const archiveController = require('../controllers/archiveController');

const router = express.Router();

router.get('/', archiveController.getTimetable);
router.get('/archive', archiveController.archiveTimetable);
router.get('/timetable/:Department_Name/:Year', archiveController.getTimetableOf)

module.exports = router;