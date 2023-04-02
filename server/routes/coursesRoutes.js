const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const coursesController = require('../controllers/coursesController');

const router = express.Router();

router.use(requireAuth);

router.get('/:Department_ID', coursesController.getDepartmentCourses)
router.post('/addCourse',coursesController.addCourse)
router.delete('/deleteCourse',coursesController.deleteCourse)

module.exports = router;
