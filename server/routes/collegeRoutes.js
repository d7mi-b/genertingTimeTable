const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const collegeController = require('../controllers/collegeController');

const router = express.Router();

router.use(requireAuth);

router.get('/', collegeController.getColleges);
router.get('/:College_ID', collegeController.getCollege);
router.post('/add', collegeController.addCollege);
router.put('/update', collegeController.updateCollege);
router.delete('/delete', collegeController.deleteCollege);

module.exports = router;