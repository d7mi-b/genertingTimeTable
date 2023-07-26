const express = require('express');
const timeTableController = require('../controllers/timeTableController');

const router = express.Router();

router.get('/', timeTableController.getAllSchedules);
router.get('/groupsNumber', timeTableController.groupsNumberInTimetable);
router.get('/search/:search', timeTableController.timetableSearch);
router.get('checkModulesForGenerating', timeTableController.checkModulesForGenerating);
router.get('/availableHalls/:search', timeTableController.avilableHallsinTimetable);
router.get('/availableHallsAllWeek/:search', timeTableController.avilableHallsAllWeek);

module.exports = router;