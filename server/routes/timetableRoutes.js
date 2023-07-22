const express = require('express');
const timeTableController = require('../controllers/timetableController');

const router = express.Router();

router.get('/', timeTableController.getAllSchedules);
router.get('/groupsNumber', timeTableController.groupsNumberInTimetable);
router.get('/search/:search', timeTableController.timetableSearch);

module.exports = router;