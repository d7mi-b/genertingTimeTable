const express = require('express');
const departmentController = require('../controllers/departementController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', departmentController.getDepartements);
router.post('/addDepartment', departmentController.addDepartment);
router.get('/:Department_ID', departmentController.getOneDepartment);
router.get('/college/:College_ID', departmentController.getDepartementsCollege)
router.put('/updateDepartment', departmentController.updateDepartment);
router.delete('/deleteDepartment', departmentController.deleteDepartment);

module.exports = router;