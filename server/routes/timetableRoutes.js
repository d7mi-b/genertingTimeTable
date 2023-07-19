const express = require('express');
const timetableController = require('../controllers/timetableController');

const router = express.Router();

router.get('/groupsNumber', timetableController.groupsNumberInTimetable);
router.get('/search/:search', timetableController.timetableSearch);

module.exports = router;