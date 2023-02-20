const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const lecturerController = require('../controllers/lecturerController');

const router = express.Router();

router.use(requireAuth);

router.get('/department/:Department_ID', lecturerController.getLecturersOfDepartment);
router.post('/addLecturer',lecturerController.postLecturersOfDepartment)
router.put('/updateLecturer',lecturerController.updateLecturer)
router.delete('/deleteLecturer',lecturerController.deleteLecturer)

module.exports = router;