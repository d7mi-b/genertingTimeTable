const express = require('express');
const algorithm = require('../algorithms/generatingTimetable');

const router = express.Router();

router.get('/', algorithm.generatingTimetable);

module.exports = router;