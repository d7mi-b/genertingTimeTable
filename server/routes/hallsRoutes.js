const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const hallsController = require('../controllers/hallsController');

const router = express.Router();

router.use(requireAuth);

router.post('/addHall', hallsController.addHall);
router.delete('/deleteHall', hallsController.deleteHall);
router.get('/building/:Building_ID', hallsController.hallsOfBuilding);
router.get('/department/:Department_ID', hallsController.hallsOfDepartment);

module.exports = router;