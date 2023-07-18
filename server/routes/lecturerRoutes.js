const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const lecturerController = require('../controllers/lecturerController');

const router = express.Router();

router.use(requireAuth);

router.get('/department/:Department_ID', lecturerController.getLecturersOfDepartment);
router.get('/department_short/:Department_ID', lecturerController.getLecturersOfDepartment_short);
router.post('/addLecturer',lecturerController.postLecturersOfDepartment)
router.put('/updateLecturer',lecturerController.updateLecturer)
router.delete('/deleteLecturer',lecturerController.deleteLecturer)
router.get('/totalHours/:Lecturer_ID', lecturerController.totalHores);
router.get('/checkLecturersNumber', lecturerController.checkLecturersNumber);

module.exports = router;