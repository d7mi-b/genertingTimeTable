const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const lecturerController = require('../controllers/lecturerController');

const router = express.Router();

router.use(requireAuth);

router.get('/department/:Department_ID', lecturerController.getLecturersOfDepartment);
router.post('/')

module.exports = router;