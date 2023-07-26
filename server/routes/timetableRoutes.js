const express = require('express');
const timeTableController = require('../controllers/timeTableController');

const router = express.Router();

router.get('/', timeTableController.getAllSchedules);
router.get('/groupsNumber', timeTableController.groupsNumberInTimetable);
router.get('/search/:search', timeTableController.timetableSearch);
<<<<<<< HEAD
router.get('checkModulesForGenerating', timeTableController.checkModulesForGenerating);
router.get('/availableHalls/:search', timeTableController.avilableHallsinTimetable);
router.get('/availableHallsAllWeek/:search', timeTableController.avilableHallsAllWeek);
=======
router.get('/checkModulesForGenerating', timeTableController.checkModulesForGenerating);
>>>>>>> ff7eb8e8521a79bbda6b9870214e34eee2a5eb60

module.exports = router;